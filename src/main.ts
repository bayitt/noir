import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';
import { PrismaService } from './modules/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  const corsDomains = configService.get('ENABLED_CORS_DOMAINS').split(',');
  app.enableCors({ origin: corsDomains });

  await app.listen(3000);
}
bootstrap();
