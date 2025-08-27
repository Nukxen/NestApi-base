import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BeatifulyConsole } from '../lib/beatifuly-console';
import { AppModule } from './app.module';

const port = process.env.PORT || 3030;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('User API')
      .setDescription('Controle interno de usuarios na api')
      .setVersion('1.0.1')
      .build();
      
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, { jsonDocumentUrl: '/api/json' });

    await app.listen(port);
    console.clear();
    BeatifulyConsole.message(`Api rodando: http://localhost:${port}/api`);
  } catch (e) {
    console.clear();
    BeatifulyConsole.message(e, true);
  }
}
bootstrap();
