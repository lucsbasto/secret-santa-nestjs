import { Injectable } from '@nestjs/common';
import { DataMessage } from './DataMessage.interface';
import { send } from './mail.config';
@Injectable()
export class EmailService {
  async sendMail(dataMessage: DataMessage): Promise<void> {
    try {
      await send(dataMessage);
    } catch (error) {
      throw new Error(error);
    }
  }
}
