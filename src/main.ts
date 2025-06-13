import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BeatifulyConsole } from '../lib/beatifuly-console';

const port = process.env.PORT || 3030;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('User API')
      .setDescription('Controle interno de usuarios na api')
      .setVersion('1.0.1')
      .addTag('CRUD, UserData')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    console.clear();
    BeatifulyConsole.message(`Api rodando: http://localhost:${port}/api`);
  } catch (e) {
    console.clear();
    BeatifulyConsole.message(e, true);
  }
}
bootstrap();
