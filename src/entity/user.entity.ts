
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import  {Appartment} from './appartment.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ type: 'timestamptz' })
    createdAt: Date

    @Column({ type: 'timestamptz' })
    modifiedAt: Date

    @Column({ type: 'timestamptz' })
    deletedAt: Date

    @Column({default: true})
    status: boolean


    @Column({length:50})
    phoneNumber: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(()=> Appartment, (appartment) => appartment.user)
    appartments: Appartment[]
}
