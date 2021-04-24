import Database from '../src/Database';
import User from '../src/entity/User';
import UserService from '../src/services/UserService';

const userService = new UserService();

beforeAll(async () => {
  await Database.createDatabaseConnection();
});

// afterAll(async () => {
//   await Database.clear();
//   await Database.closeConnection();
// });

test('Create a user', async () => {
  const user: User = await userService.createUser(
    'Test',
    'User',
    'test@test.com',
    'base64String',
    'password'
  );

  expect(user.hasId()).toBe(true);
});

test('Get list of users', async () => {
  const users: Array<User> = await userService.listUsers();

  expect(users[0].hasId()).toBe(true);
});

test('Get user by e-mail', async () => {
  const user: User = await userService.getUserByEmail('test@test.com');

  expect(user.hasId()).toBe(true);
});

test('Update user firstname', async () => {
  const user: User = await userService.getUserByEmail('test@test.com');

  user.firstname = 'Updated Name';

  await userService.updateUser(user);

  const updatedUser: User = await userService.getUserByEmail('test@test.com');

  expect(updatedUser.firstname).toBe('Updated Name');
});

test('Delete user', async () => {
  const user: User = await userService.getUserByEmail('test@test.com');

  await userService.deleteUser(user.id);

  const deletedUser: User = await userService.getUserByEmail('test@test.com');

  expect(deletedUser).toBe(undefined);
});
