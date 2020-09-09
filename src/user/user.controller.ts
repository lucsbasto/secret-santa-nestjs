import { Controller, Post, Param, Body, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserModel } from './user.schema';
import { RaffleService } from '../raffle/raffle.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async store(@Body() user: User, @Res() res): Promise<Response> {
    try {
      const userData = await this.userService.store(user);
      return res.status(201).json({ user: userData });
    } catch (error) {
      return res.json({ error: error.message, stack: error.stack });
    }
  }

  @Get('')
  async index(@Param() params, @Res() res): Promise<Response> {
    try {
      const data = await this.userService.index(params);
      return res.status(200).json({ users: data });
    } catch (error) {
      return res.status(400).send({ error: error.message, stack: error.stack });
    }
  }
  @Get('id')
  async show(@Param('id') id: string, @Res() res): Promise<Response> {
    try {
      const user = await this.userService.show(id);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).send({ error: error.message, stack: error.stack });
    }
  }

  @Get('raffle')
  async raffle(@Res() res): Promise<Response> {
    try {
      const users = await this.userService.raffleUsers();
      return res.send({ message: 'Users raffled' });
    } catch (error) {
      return res.status(400).send({ error: error.message, stack: error.stack });
    }
  }
}
