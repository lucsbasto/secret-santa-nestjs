import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { schema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: schema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
