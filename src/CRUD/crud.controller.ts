import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { User } from './dto/create-user.dto';
import { UpdateUserDto as newUserData } from './dto/update-user.dto';
import { CRUDService } from './crud.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('crud-user')
export class CRUDController {
  constructor(private readonly CRUDService: CRUDService) {}

  @Post('cUser')
  @ApiOperation({ summary: 'Criar um novo usuario.' })
  @ApiResponse({
    status: 201,
    description: 'Usuario adicionado com sucesso!',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Erro na requisição!' })
  create(@Body() user: User) {
    this.CRUDService.createUser(user);
  }

  @Get('gAll')
  @ApiOperation({ summary: 'Listar usuarios existentes.' })
  @ApiResponse({
    status: 200,
    description: 'Aqui está a lista de usuarios.',
    type: [User],
  })
  @ApiResponse({ status: 400, description: 'Erro na requisição!' })
  getUsers(): {} {
    return this.CRUDService.getUsers();
  }

  @Get('gUser')
  @ApiOperation({ summary: 'Listar um usuario especifico.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Aqui está o usuario.',
  })
  @ApiResponse({ status: 400, description: 'Erro na requisição!' })
  getUser(@Body() data: { id: number }) {
    return this.CRUDService.getUser(data);
  }

  @Post('updateUser')
  @ApiOperation({ summary: 'Recebe dados pra atualizar do usuario.' })
  @ApiParam(newUserData)
  @ApiResponse({
    status: 202,
    description: 'Dados atualizados com sucesso!',
  })
  @ApiResponse({
    status: 400 | 500,
    description: 'Erro na requisição',
  })
  updateUser(@Body() newUserData) {
    this.CRUDService.updateUser(newUserData);
  }

  @Post('deleteUser')
  @ApiOperation({ summary: 'Recebe o id do usuario a ser deletado.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 202, description: 'Usuario deletado com sucesso!' })
  @ApiResponse({
    status: 400 | 500,
    description: 'Erro na requisição',
  })
  deleteUser(@Body() data: { id: number }) {
    this.CRUDService.deleteUser(data);
  }
}
