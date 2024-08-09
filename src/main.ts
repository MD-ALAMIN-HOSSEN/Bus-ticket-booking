import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false,
      maxAge: 5 * 60 * 1000
     } // Set secure to true if using HTTPS
  }));
  await app.listen(3000);
}
bootstrap();
