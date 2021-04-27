import { getRepository } from 'typeorm';

import { isEmpty } from '../utils';

import User from '../entity/User';

class UserService {
  public async createUser(
    firstname: string,
    lastname: string,
    email: string,
    avatar: string,
    password: string
  ): Promise<User> {
    if (
      isEmpty(firstname) ||
      isEmpty(lastname) ||
      isEmpty(email) ||
      isEmpty(avatar) ||
      isEmpty(password)
    ) {
      throw new Error('All parameters must be filled.');
    }

    if (!(await getRepository(User).findOne({ email }))) {
      const user: User = User.create({
        firstname,
        lastname,
        email,
        avatar,
        password
      });
      return await User.save(user);
    } else {
      throw new Error('There is already a user with this e-mail.');
    }
  }

  public async listUsers(): Promise<Array<User>> {
    return await getRepository(User).find();
  }

  public async getUserByEmail(email: string): Promise<User> {
    if (isEmpty(email)) {
      throw new Error('E-mail must be informed.');
    }
    return await getRepository(User).findOne({ email });
  }

  public async updateUser(user: User) {
    return await getRepository(User).update(user.id, user);
  }

  public async deleteUser(id: number) {
    if (isEmpty(id)) {
      throw new Error('User id must be informed.');
    }
    return await getRepository(User).delete(id);
  }
}

export default UserService;
