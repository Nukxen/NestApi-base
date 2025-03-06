import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { User } from './dto/user-data.dto';
import { CRUDService } from './crud.service';

@Controller('crud')
export class CRUDController {
  constructor(private readonly CRUDService: CRUDService) {}

  @Post('pUser')
  @HttpCode(201)
  create(@Body() user: User) {
    this.CRUDService.create(user);
  }

  @Get('gAll')
  @HttpCode(200)
  async getUsers(): Promise<{}> {
    return this.CRUDService.getUsers();
  }
}
