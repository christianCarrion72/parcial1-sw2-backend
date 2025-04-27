import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('archivo')
export class ArchivoController {
  constructor(
    private readonly archivoService: ArchivoService,
  ) {}

  @Post()
  create(@Body() createArchivoDto: CreateArchivoDto) {
    return this.archivoService.create(createArchivoDto);
  }

  @Get()
  findAll() {
    return this.archivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchivoDto: UpdateArchivoDto) {
    return this.archivoService.update(+id, updateArchivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoService.remove(+id);
  }

  @Post('upload-file')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if(file.mimetype.match(/^(image|audio)/)){
        cb(null, true);
      }else{
        cb(new Error('Solo se permiten archivos de imagen y audio'), false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB limite
    }
  }))
  async UploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('fileName') fileName: string,
    @Res() res: Response) {
    try{
      const response = await this.archivoService.uploadFile({
        file,
        fileName: fileName || file.originalname
      });
      res.status(HttpStatus.OK).send(response)
    }catch(error){
      throw error;
    }
  }
}
