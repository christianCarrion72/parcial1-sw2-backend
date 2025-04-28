import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const seedService = appContext.get(SeedService);

  try {
    await seedService.run();
    console.log('Seeding completado exitosamente!');
  } catch (error) {
    console.error('Error durante el seeding:', error);
    throw error;
  } finally {
    await appContext.close();
  }
}

bootstrap();