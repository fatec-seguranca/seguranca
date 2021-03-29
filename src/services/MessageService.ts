import Message from '../entity/Message';
import User from '../entity/User';

class MessageService {
  public async sendMessage(
    content: string,
    sender: User,
    recipient: User
  ): Promise<Message> {
    let message: Message = Message.create({
      content,
      sender,
      recipient
    });

    return await Message.save(message);
  }
}

export default new MessageService();
