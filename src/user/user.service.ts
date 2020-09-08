import { Injectable } from '@nestjs/common';
import { User, UserModel } from './user.schema';
import { Model } from 'mongoose';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly userModel: Model<UserModel>) {}

  async store(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  async index(): Promise<User[]> {
    const users = await this.userModel.find({});
    return users;
  }

  async show(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleteUser = await this.userModel.deleteOne({ id }).exec();
    if (deleteUser.deletedCount == 0) throw new Error('Not Found');
    return { message: 'Deleted' };
  }

  async update(id: string, user: User): Promise<User | { error: string }> {
    const updatedUser = await this.userModel.findById(id);
    if (!updatedUser) throw new Error('not found');
    if (user.name) updatedUser.name = user.name;
    if (user.email) updatedUser.email = user.email;
    if (user.friend) updatedUser.friend = user.friend;
    await updatedUser.save();
    return updatedUser;
  }
}
