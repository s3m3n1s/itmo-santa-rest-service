import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

const { MONGODB_URL } = process.env;

console.log(process.env.MONGODB_URL);

@Module({
  imports: [UsersModule, MongooseModule.forRoot(MONGODB_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
