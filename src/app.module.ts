import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { TokenModule } from './modules/token/token.module';
import { CategoryModule } from './modules/category/category.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ArticleModule } from './modules/article/article.module';
import { DateTimeScalar, UploadScalar } from './graphql';

@Module({
  imports: [
    DateTimeScalar,
    UploadScalar,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), 'src/graphql/*.graphql')],
      definitions: {
        path: join(process.cwd(), 'src/graphql/schema.ts'),
      },
      introspection: true,
      playground: true,
    }),
    AuthModule,
    ConfigModule,
    TokenModule,
    CategoryModule,
    PrismaModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
