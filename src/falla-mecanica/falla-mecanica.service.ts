import { Injectable } from '@nestjs/common';
import { CreateFallaMecanicaDto } from './dto/create-falla-mecanica.dto';
import { UpdateFallaMecanicaDto } from './dto/update-falla-mecanica.dto';

@Injectable()
export class FallaMecanicaService {
  create(createFallaMecanicaDto: CreateFallaMecanicaDto) {
    return 'This action adds a new fallaMecanica';
  }

  findAll() {
    return `This action returns all fallaMecanica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fallaMecanica`;
  }

  update(id: number, updateFallaMecanicaDto: UpdateFallaMecanicaDto) {
    return `This action updates a #${id} fallaMecanica`;
  }

  remove(id: number) {
    return `This action removes a #${id} fallaMecanica`;
  }
}
