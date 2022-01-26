import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { AppMiddleware } from './app.middleware';
import { ConferencesModule } from './conferences/conferences.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { v2 as cloudinary } from 'cloudinary';
import { AppGateway } from './app.gateway';
import { MessagesModule } from './messages/messages.module';

dotenv.config({ path: '.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(`mongodb+srv://Daptellum:${process.env.MONGO_PASS}@clusterfdn.hhavp.mongodb.net/Fdn?retryWrites=true&w=majority`),
    AuthModule,
    ConferencesModule,
    CloudinaryModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppGateway]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}