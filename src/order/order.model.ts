import {
    Entity,
    Column,
    OneToMany,
    DeleteDateColumn,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinColumn
} from 'typeorm';

import { AppEntity } from '../base/BaseEntity';

@Entity()
export class Order extends AppEntity {

    @Column()
    currency: string;

    @Column()
    crypt: string;

    @Column()
    payment: string;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    paymentData: {};

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    userData: {};

    @Column()
    status: string;

}