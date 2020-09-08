import { Controller } from '@nestjs/common';
import { RaffleService } from './raffle.service';

@Controller('raffle')
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  async raffle(): Promise<void> {
    const users = await this.raffleService.getUsers();
    const raffled = this.raffleService.raffleUntilIsAllMatched(users);
    const savedUsers = this.raffleService.saveRaffledUsers(raffled);
  }
}
