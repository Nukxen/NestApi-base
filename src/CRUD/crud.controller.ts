import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { User } from './dto/create-user.dto';
import { CRUDService } from './crud.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('crud-user')
export class CRUDController {
  constructor(private readonly CRUDService: CRUDService) {}

  @Post('cUser')
  @ApiOperation({ summary: "Criar um novo usuario." })
  @ApiResponse({ status: 201, description: "Usuario adicionado com sucesso!",type: User })
  @ApiResponse({ status: 400, description: "Erro na requisição!" })
  create(@Body() user: User) {
    this.CRUDService.create(user);
  }

  @Get('gAll')
  @ApiOperation({ summary: "Listar usuarios existentes." })
  @ApiResponse({ status: 200, description: "Aqui está a lista de usuarios.",type: [User] })
  @ApiResponse({ status: 400, description: "Erro na requisição!" })
  getUsers(): {} {
    return this.CRUDService.getUsers();
  }
}
