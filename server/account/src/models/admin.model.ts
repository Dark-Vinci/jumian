import { BeforeInsert, Column, Entity } from 'typeorm';
import bcrypt from 'bcrypt';

import Base from './base-models/base.model';

interface UserInterface {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    email: string;
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
        name: 'email',
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        name: 'password',
        type: 'text',
        nullable: false,
        unique: true,
    })
    password: string;

    public constructor(user: UserInterface) {
        super();

        this.password = user.password;
        this.email = user.email;
        this.last_name = user.last_name;
        this.first_name = user.first_name;
    }

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

export default User;
