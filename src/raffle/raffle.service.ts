import { Injectable } from '@nestjs/common';
import { User, UserModel } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';

@Injectable()
export class RaffleService {
  shuffle(users: UserModel[]) {
    var i: number, user: UserModel, j: number;
    for (i = users.length - 1; i > 0; i -= 1) {
      user = users[i];
      j = Math.floor(Math.random() * (i + 1));
      users[i] = users[j];
      users[j] = user;
    }
    return users;
  }

  match(users: UserModel[], shuffled: UserModel[]): UserModel[] {
    users.map((users, index) => {
      users.friend = shuffled[index].name;
    });
    return users;
  }

  isMatched(user): boolean {
    return user.name !== user.friend;
  }

  async raffleUntilIsAllMatched(users: UserModel[]): Promise<void> {
    const suffledUsers = this.shuffle([...users]);
    const matched = this.match(users, suffledUsers);
    var isMatched = matched.every(this.isMatched);
    while (isMatched) {
      this.raffleUntilIsAllMatched(matched);
    }
    const savedUsers = await this.saveRaffledUsers(matched);
  }

  async saveRaffledUsers(users: UserModel[]): Promise<void> {
    for await (let user of users) {
      await user.save();
    }
  }
}
