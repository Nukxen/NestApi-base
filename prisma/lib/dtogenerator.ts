import { getDMMF } from '@prisma/internals';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

// === Helpers ===
function mapFieldType(prismaType: string): string {
  switch (prismaType) {
    case 'String':
      return 'string';
    case 'Int':
    case 'Float':
    case 'Decimal':
      return 'number';
    case 'Boolean':
      return 'boolean';
    case 'DateTime':
      return 'Date';
    case 'Json':
      return 'Record<string, any>';
    default:
      return prismaType; // Para enums
  }
}

function getValidatorDecorator(prismaType: string, isEnum: boolean, enumType: string): string {
  if (isEnum) return `@IsEnum(${enumType})`;
  switch (prismaType) {
    case 'String':
      return '@IsString()';
    case 'Int':
    case 'Float':
    case 'Decimal':
      return '@IsNumber()';
    case 'Boolean':
      return '@IsBoolean()';
    case 'DateTime':
      return `@IsDate()
  @Transform(({ value }) => new Date(value))`;
    case 'Json':
      return '@IsJSON()';
    default:
      return '';
  }
}

function isUUIDDefault(field: any): boolean {
  return field.default && typeof field.default === 'object' && field.default.name === 'uuid';
}
function isAutoIncrementId(field: any): boolean {
  return (
    field.isId &&
    field.hasDefaultValue &&
    field.default &&
    typeof field.default === 'object' &&
    field.default.name === 'autoincrement'
  );
}

function generateEnumFiles(enums, outputDir: string) {
  fs.mkdirSync(outputDir, { recursive: true });
  enums.forEach((e) => {
    const lines = [`export enum ${e.name} {`, ...e.values.map((v) => `  ${v.name} = '${v.name}',`), `}`];
    fs.writeFileSync(path.join(outputDir, `${e.name}.ts`), lines.join('\n'));
  });
}

async function generateDTOs() {
  const schemaPath = path.resolve(__dirname, '../schema.prisma');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const dmmf = await getDMMF({ datamodel: schema });
  const enumsMap = Object.fromEntries(dmmf.datamodel.enums.map((e) => [e.name, e.values.map((v) => v.name)]));
  // Gera arquivos de enum
  generateEnumFiles(dmmf.datamodel.enums, path.resolve(__dirname, 'dtos/enums'));
  dmmf.datamodel.models.forEach((model) => {
    const dtoLines: string[] = [];
    const importLines = new Set<string>([
      `import { ApiProperty } from '@nestjs/swagger';`,
      `import { Transform } from 'class-transformer';`,
      `import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsUUID, IsJSON } from 'class-validator';`,
    ]);
    // Importa enums usados
    const usedEnums = new Set<string>();
    dtoLines.push(`export class Create${model.name}Dto {`);
    model.fields.forEach((field) => {
      if (field.relationName) return;

      // === Trata campos array de tipos primitivos ===
      if (field.isList) {
        const isPrimitiveArray = ['String', 'Int', 'Float', 'Decimal', 'Boolean', 'DateTime'].includes(field.type);
        if (!isPrimitiveArray) return; // Ignora arrays de relação

        const baseType = mapFieldType(field.type);
        importLines.add(`import { IsArray } from 'class-validator';`);

        dtoLines.push(
          `  @ApiProperty({ type: ${baseType === 'Date' ? baseType : `'${baseType}'`}, isArray: true })`,
          `  @IsArray()`,
          `  ${getValidatorDecorator(field.type, false, '')?.replace('()', '({ each: true })')}`,
          `  ${field.isRequired || !field.hasDefaultValue ? '' : '@IsOptional()'}`,
          `  ${field.name}${ !field.isRequired || field.hasDefaultValue  ? '?' : ''}: ${baseType}[]`,
          ``,
        );
        return; // Evita cair na lógica normal de campo único
      }

      // === Resto da lógica atual para campo normal ===
      const isOptional = !field.isRequired;
      const isAutoGenerater = field.hasDefaultValue
      const isEnum = field.type in enumsMap;
      const type = mapFieldType(field.type);
      const isUuid = isUUIDDefault(field);
      const isJson = field.type == 'Json';
      const isAutoIncrement = isAutoIncrementId(field);

      const hasOptional = isOptional || isUuid || isAutoIncrement||isAutoGenerater

      if (isEnum) {
        usedEnums.add(field.type);
        importLines.add(`import { IsEnum } from 'class-validator';`);
        importLines.add(`import { ${field.type} } from './enums/${field.type}';`);
      }

      const validator = getValidatorDecorator(field.type, isEnum, field.type);
      const optionalDecorator = hasOptional ? '@IsOptional()' : '';

      let apiLine = `  @ApiProperty({ title: '${field.name.substring(0, 1).toUpperCase() + field.name.substring(1)}',`;
      if (isEnum) {
        apiLine += ` enum: ${field.type}, enumName: '${field.type}'`;
      } else if (isUuid) {
        apiLine += ` type: 'string', format: 'uuid', readOnly: true`;
      } else if (isAutoIncrement) {
        apiLine += ` type: ${type === 'Date' ? type : `'${type}'`}, readOnly: true`;
      } else if (isJson) {
        // deixa o default
      } else {
        apiLine += ` type: ${type === 'Date' ? type : `'${type}'`}`;
      }
      apiLine += ` })`;

      dtoLines.push(
        apiLine,
        `  ${validator}`,
        `  ${optionalDecorator}`,
        `  ${field.name}${hasOptional ? '?' : ''}: ${type}`,
        ``,
      );
    });
    dtoLines.push(`}`);
    dtoLines.push(``, `export class Update${model.name}Dto implements Partial<Create${model.name}Dto> {}`);
    // DTO de Retorno
    dtoLines.push(``, `export class Return${model.name}Dto {`);
    model.fields.forEach((field) => {
      const isRelation = !!field.relationName;

      if (isRelation) {
        const isArray = field.isList;
        const relatedDto = `Return${field.type}Dto`;
        const tsType = isArray ? `${relatedDto}[]` : `${relatedDto} | null`;

        importLines.add(`import { ${relatedDto} } from './${field.type}.dto';`);

        dtoLines.push(
          `  @ApiProperty({ type: () => ${relatedDto}, isArray: ${isArray} })`,
          `  @IsOptional()`,
          `  ${field.name}?: ${tsType};`,
          ``,
        );
      } else {
        const isOptional = !field.isRequired;
        const isEnum = field.type in enumsMap;
        const type = mapFieldType(field.type);
        const isUuid = isUUIDDefault(field);
        const isJson = field.type === 'Json';
        const isAutoIncrement = isAutoIncrementId(field);

        if (isEnum) {
          usedEnums.add(field.type);
          importLines.add(`import { IsEnum } from 'class-validator';`);
          importLines.add(`import { ${field.type} } from './enums/${field.type}';`);
        }

        const validator = getValidatorDecorator(field.type, isEnum, field.type);
        const optionalDecorator = isOptional || isUuid || isAutoIncrement ? '@IsOptional()' : '';

        let apiLine = `  @ApiProperty({ title: '${
          field.name.substring(0, 1).toUpperCase() + field.name.substring(1)
        }',`;
        if (isEnum) {
          apiLine += ` enum: ${field.type}, enumName: '${field.type}'`;
        } else if (isUuid) {
          apiLine += ` type: 'string', format: 'uuid', readOnly: true`;
        } else if (isAutoIncrement) {
          apiLine += ` type: ${type === 'Date' ? type : `'${type}'`}, readOnly: true`;
        } else if (isJson) {
        } else {
          apiLine += ` type: ${type === 'Date' ? type : `'${type}'`}`;
        }
        apiLine += ` })`;

        dtoLines.push(
          apiLine,
          `  ${validator}`,
          `  ${optionalDecorator}`,
          `  ${field.name}${isOptional ? '?' : ''}: ${type};`,
          ``,
        );
      }
    });
    dtoLines.push(`}`);
    const fullOutput = Array.from(importLines)
      .concat(['', ...dtoLines])
      .join('\n');
    const outputPath = path.resolve(__dirname, 'dtos', `${model.name}.dto.ts`);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, fullOutput);
  });
}

(async () => {
  console.log(chalk.cyan('[PROCESS] Iniciando geração de DTOs...'));
  try {
    await generateDTOs();
    console.log(chalk.green('[PROCESS] DTO gerado com sucesso'));
  } catch (e) {
    console.error('Erro ao gerar DTOs:', e);
  }
})();
