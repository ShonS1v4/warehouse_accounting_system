import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  await app.listen(port, async () => {
    console.log(`Server started on http://localhost:${port || 3001}`);
  });
}
bootstrap();
