import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  async store(@Body() user: User, res: Response): Promise<Response> {
    try {
      const userData = await this.userService.store(user);
      return res.status(200).send(userData);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  @Get('')
  async index(res: Response): Promise<Response> {
    try {
      const data = await this.userService.index();
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ error: error.message, stack: error.stack });
    }
  }
  @Get('id')
  async show(@Param('id') id: string, res: Response): Promise<Response> {
   try {
    const user = await this.userService.show(id);
    return res.status(200).send(user);
   } catch (error) {
    return res.status(400).send({ error: error.message });

   }
    );
  }
}
