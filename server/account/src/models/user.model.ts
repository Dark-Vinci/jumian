import { BeforeInsert, Column, Entity } from 'typeorm';
import bcrypt from 'bcrypt';

import Base from './base-models/base.model';

interface UserInterface {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  phone_number: string;
  password: string;
  level: number;
  created_at?: Date;
  update_at?: Date;
  deleted_at?: Date;
}

@Entity({ name: 'users' })
class User extends Base {
  @Column({
    name: 'first_name',
    nullable: false,
    type: 'varchar',
  })
  first_name: string;

  @Column({
    name: 'last_name',
    nullable: false,
    type: 'varchar',
  })
  last_name: string;

  @Column({
    name: 'date_of_birth',
    type: 'timestamp',
    nullable: false,
  })
  date_of_birth: Date;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  phone_number: string;

  @Column({
    name: 'version',
    type: 'int',
    nullable: false,
  })
  level: number;

  // public constructor(user: UserInterface) {
  //   super();
  //
  //   // set entity fields
  //   this.email = user.email;
  //   this.level = 1;
  //   this.last_name = user.last_name;
  //   this.first_name = user.first_name;
  //   this.phone_number = user.phone_number;
  // }

  public fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}

export default User;
