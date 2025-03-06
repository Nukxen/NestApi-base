import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class User {
  // @ApiProperty({ example: 1, description: 'Identificador do usuario' })
  readonly id: number;

  @ApiProperty({ example: 'Josue', description: 'Nome do usuario' })
  readonly name: string;

  @ApiProperty({
    example: 'Josue.carvalho@gmail.com',
    description: 'Email do usuario',
  })
  readonly email: string;

  @ApiProperty({
    example: '(27)12345678',
    description: 'Telefone do Josue (Usuario)',
  })
  @IsOptional()
  readonly telefone: string | null;
}
