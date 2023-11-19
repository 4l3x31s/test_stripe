import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
const port = process.env.PORT || 3000;
async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const httpsOptions = {
    key: fs.readFileSync(__dirname + `/cert/server.key`, 'utf8'),
    cert: fs.readFileSync(__dirname + `/cert/server.crt`, 'utf8'),
  };
  const app = await NestFactory.create(AppModule, {
    //httpsOptions
  });

  app.enableCors();
  await app.listen(port);
}
bootstrap();
