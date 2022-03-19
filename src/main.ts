import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;

  const swaggerConfig = new DocumentBuilder()
      .setTitle('Warehouse accounting system')
      .setDescription('Documentation for NestJS "WAS API"')
      .setVersion('beta 0.9')
      .build()

  const swagger = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup('/api', app, swagger)

  await app.listen(port, async () => {
    console.log(`Server started on http://localhost:${port || 3001}/api`);
  });
}

bootstrap();
