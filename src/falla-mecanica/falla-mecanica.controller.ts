import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FallaMecanicaService } from './falla-mecanica.service';
import { CreateFallaMecanicaDto } from './dto/create-falla-mecanica.dto';
import { UpdateFallaMecanicaDto } from './dto/update-falla-mecanica.dto';

@Controller('falla-mecanica')
export class FallaMecanicaController {
  constructor(private readonly fallaMecanicaService: FallaMecanicaService) {}

  /*@Post()
  create(@Body() createFallaMecanicaDto: CreateFallaMecanicaDto) {
    return this.fallaMecanicaService.create(createFallaMecanicaDto);
  }

  @Get()
  findAll() {
    return this.fallaMecanicaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fallaMecanicaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFallaMecanicaDto: UpdateFallaMecanicaDto) {
    return this.fallaMecanicaService.update(+id, updateFallaMecanicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fallaMecanicaService.remove(+id);
  }*/
}
