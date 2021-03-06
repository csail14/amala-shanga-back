import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('ici');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;
  const host = process.env.HOST || '0.0.0.0';
  console.log('port', port);
  await app.listen(port, host, () => {
    console.log('Server started on ' + host + ':' + port);
  });
}
bootstrap();
