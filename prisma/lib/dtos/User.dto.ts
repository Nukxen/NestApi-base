import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean, IsDate, IsUUID, IsJSON } from 'class-validator';
import { IsEnum } from 'class-validator';
import { AcessLevel } from './enums/AcessLevel';

export class CreateUserDto {
  @ApiProperty({ title: 'Id', type: 'number', readOnly: true })
  @IsNumber()
  @IsOptional()
  id?: number

  @ApiProperty({ title: 'Name', type: 'string' })
  @IsString()
  
  name: string

  @ApiProperty({ title: 'Email', type: 'string' })
  @IsString()
  
  email: string

  @ApiProperty({ title: 'Telefone', type: 'string' })
  @IsString()
  @IsOptional()
  telefone: string

  @ApiProperty({ title: 'AcessLevel', enum: AcessLevel, enumName: 'AcessLevel' })
  @IsEnum(AcessLevel)
  
  acessLevel?: AcessLevel

}

export class UpdateUserDto implements Partial<CreateUserDto> {}

export class ReturnUserDto {
  @ApiProperty({ title: 'Id', type: 'number', readOnly: true })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ title: 'Name', type: 'string' })
  @IsString()
  
  name: string;

  @ApiProperty({ title: 'Email', type: 'string' })
  @IsString()
  
  email: string;

  @ApiProperty({ title: 'Telefone', type: 'string' })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiProperty({ title: 'AcessLevel', enum: AcessLevel, enumName: 'AcessLevel' })
  @IsEnum(AcessLevel)
  
  acessLevel: AcessLevel;
  
}