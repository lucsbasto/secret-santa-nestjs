import { EmailService } from './utils/email.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RaffleController } from './raffle/raffle.controller';
import { RaffleService } from './raffle/raffle.service';
@Module({
  imports: [MongooseModule.forRoot('mongo://loc'), UserModule],
  controllers: [AppController, RaffleController],
  providers: [EmailService, AppService, RaffleService],
})
export class AppModule {}
