import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'hero2',
        protoPath: join(__dirname, 'proto/hero2.proto'),
        url: '0.0.0.0:50099',
      },
    },
  );
  await app.listen();
}
bootstrap();
