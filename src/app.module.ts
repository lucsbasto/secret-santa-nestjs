import { EmailService } from './utils/email.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RaffleService } from './raffle/raffle.service';
import { RaffleModule } from './raffle/raffle.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:huexf0eLXn4NRBZV@cluster0.x4yvu.mongodb.net/secret-santa?retryWrites=true&w=majority',
    ),
    UserModule,
    RaffleModule,
  ],
  controllers: [AppController],
  providers: [EmailService, AppService, RaffleService],
})
export class AppModule {}
