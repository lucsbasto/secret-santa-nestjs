import { Injectable } from '@nestjs/common';
import { UserModel, User } from '../user/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class RaffleService {
  constructor(private readonly userModel: Model<UserModel>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find({});
    if (users) return users;
    throw new Error('No users finded');
  }

  shuffle(users: User[]) {
    var i: number, user: User, j: number;
    for (i = users.length - 1; i > 0; i -= 1) {
      user = users[i];
      j = Math.floor(Math.random() * (i + 1));
      users[i] = users[j];
      users[j] = user;
    }
    return users;
  }

  match(users: User[], shuffled: User[]) {
    const matchedUsers = users.map((users, index) => {
      users.friend = shuffled[index].name;
    });
    return matchedUsers;
  }

  isMatched(user): boolean {
    return user.name !== user.friend;
  }

  raffleUntilIsAllMatched(users: User[]): User[] {
    const suffledUsers = this.shuffle([...users]);
    const matched = this.match(users, suffledUsers);
    var isMatched = matched.every(this.isMatched);

    while (isMatched) {
      this.raffleUntilIsAllMatched(users);
    }
    return users;
  }

  async saveRaffledUsers(users: User[]): Promise<User[]> {
    return;
  }
}
