import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty({example: 1, description: 'Identificador do usuario'})
  readonly id: number;  
  @ApiProperty({example: 'Josue', description: 'Nome do usuario'})
  readonly name: string;
  @ApiProperty({example: 'Josue.carvalho@gmail.com', description: 'Email do usuario'})
  readonly email: string;
}
