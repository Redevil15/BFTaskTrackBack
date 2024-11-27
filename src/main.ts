import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Permite solicitudes desde el cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  //app.use(ClerkExpressWithAuth());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
