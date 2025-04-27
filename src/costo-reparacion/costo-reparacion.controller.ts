import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CostoReparacionService } from './costo-reparacion.service';
import { CreateCostoReparacionDto } from './dto/create-costo-reparacion.dto';
import { UpdateCostoReparacionDto } from './dto/update-costo-reparacion.dto';

@Controller('costo-reparacion')
export class CostoReparacionController {
  constructor(private readonly costoReparacionService: CostoReparacionService) {}

  @Post()
  create(@Body() createCostoReparacionDto: CreateCostoReparacionDto) {
    return this.costoReparacionService.create(createCostoReparacionDto);
  }

  @Get()
  findAll() {
    return this.costoReparacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costoReparacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostoReparacionDto: UpdateCostoReparacionDto) {
    return this.costoReparacionService.update(+id, updateCostoReparacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costoReparacionService.remove(+id);
  }
}
