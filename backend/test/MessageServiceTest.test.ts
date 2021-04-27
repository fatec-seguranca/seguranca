import Database from '../src/Database';

import User from '../src/entity/User';
import Message from '../src/entity/Message';

import UserService from '../src/service/UserService';
import MessageService from '../src/service/MessageService';

const userService = new UserService();

beforeAll(async () => {
  await Database.createDatabaseConnection();
});

afterAll(async () => {
  await Database.clear();
  await Database.closeConnection();
});

test('Send Message', async () => {
  const sender: User = await userService.createUser(
    'Sender',
    'User',
    'test2@test.com',
    'base64String',
    'password'
  );

  const recipient: User = await userService.createUser(
    'Recipient',
    'User',
    'test3@test.com',
    'base64String',
    'password'
  );

  const message: Message = await MessageService.sendMessage(
    'Test message',
    sender,
    recipient
  );

  expect(message.hasId()).toBe(true);
});
