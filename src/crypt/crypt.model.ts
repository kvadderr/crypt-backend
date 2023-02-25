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
export class Crypt extends AppEntity {

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({
        default: 0,
        type: 'numeric', 
        precision: 10, scale: 2 
    })
    well: number;

    @Column({
        default: 0,
        type: 'numeric', 
        precision: 10, scale: 2 
    })
    percent: number;

}