import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import Message from './Message';

@Entity('user')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @OneToMany(
    (type) => Message,
    (message) => message.sender || message.recipient
  )
  messages: Message[];
}

export default User;
