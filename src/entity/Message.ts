import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import User from './User';

@Entity('message')
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne((type) => User, (user) => user.messages)
  sender: User;

  @ManyToOne((type) => User, (user) => user.messages)
  recipient: User;
}

export default Message;
