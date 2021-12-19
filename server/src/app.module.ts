import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(`mongodb+srv://Daptellum:${process.env.MONGO_PASS}@clusterfdn.hhavp.mongodb.net/Fdn?retryWrites=true&w=majority`),
    AuthModule,
  ],
  controllers: [AppController],
  // providers: [AuthService],
})
export class AppModule { }