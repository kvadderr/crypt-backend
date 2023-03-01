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
	nullable: true,
        default: 0,
        type: 'numeric', 
        precision: 10, scale: 5 
    })
    amount: number;

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

    @Column({
        nullable: true
    })
    address: string;

}