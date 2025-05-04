import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DanoFisicoService } from './dano-fisico.service';
import { CreateDanoFisicoDto } from './dto/create-dano-fisico.dto';
import { UpdateDanoFisicoDto } from './dto/update-dano-fisico.dto';

@Controller('dano-fisico')
export class DanoFisicoController {
  constructor(private readonly danoFisicoService: DanoFisicoService) {}

  /*@Post()
  create(@Body() createDanoFisicoDto: CreateDanoFisicoDto) {
    return this.danoFisicoService.create(createDanoFisicoDto);
  }

  @Get()
  findAll() {
    return this.danoFisicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danoFisicoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDanoFisicoDto: UpdateDanoFisicoDto) {
    return this.danoFisicoService.update(+id, updateDanoFisicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danoFisicoService.remove(+id);
  }*/
}
