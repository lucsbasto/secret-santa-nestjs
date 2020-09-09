import { Module } from '@nestjs/common';
import { RaffleService } from './raffle.service';

@Module({
  providers: [RaffleService],
})
export class RaffleModule {}
