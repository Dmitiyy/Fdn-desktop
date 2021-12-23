import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { AppMiddleware } from './app.middleware';

dotenv.config({ path: '.env' });

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(`mongodb+srv://Daptellum:${process.env.MONGO_PASS}@clusterfdn.hhavp.mongodb.net/Fdn?retryWrites=true&w=majority`),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}