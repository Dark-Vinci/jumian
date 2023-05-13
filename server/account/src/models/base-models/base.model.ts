import {
  BaseEntity,
  BeforeInsert,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

export default class Base extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_DATE',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;

  @VersionColumn({
    name: 'version',
  })
  version: number;
  private password: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    try {
      const saltRound = +process.env.SALT_ROUND || 10;
      const salt = await bcrypt.genSalt(saltRound);

      const hashedPassword = await bcrypt.hash(this.password.trim(), salt);

      this.password = hashedPassword;
    } catch (error) {
      throw error;
    }
  }

  public async comparePassword(password: string): Promise<boolean> {
    try {
      const isValid = await bcrypt.compare(password, this.password);

      return isValid;
    } catch (error) {
      throw error;
    }
  }
}
