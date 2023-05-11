import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

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
}
