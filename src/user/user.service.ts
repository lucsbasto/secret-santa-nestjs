import { Injectable } from '@nestjs/common';
import { User, UserModel } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userModel: Model<UserModel>) {}

  async store(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }

  async index(params?): Promise<any> {
    try {
      const { page = 1, limit = 10 } = params;
      const users = await this.userModel
        .find({})
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const count = await this.userModel.countDocuments();
      return {
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        total: count,
        users,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const deleteUser = await this.userModel.deleteOne({ id }).exec();
      if (deleteUser.deletedCount == 0) throw new Error('Not Found');
      return { message: 'Deleted' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    user: Partial<User>,
  ): Promise<User | { error: string }> {
    try {
      const updatedUser = await this.userModel.findById(id);
      if (!updatedUser) throw new Error('not found');
      if (user.name) updatedUser.name = user.name;
      if (user.email) updatedUser.email = user.email;
      if (user.friend) updatedUser.friend = user.friend;
      await updatedUser.save();
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
