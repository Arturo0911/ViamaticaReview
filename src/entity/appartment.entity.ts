
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Appartment {
    @PrimaryGeneratedColumn()
    appartmentId: number

    @Column()
    appartmentName: string

    @Column()
    address: string

    @Column({ type: 'timestamptz' })
    createdAt: Date

    @Column({ type: 'timestamptz' })
    modifiedAt: Date

    @Column({ type: 'timestamptz' })
    deletedAt: Date

    @Column({default: true})
    status: boolean

    @ManyToOne(() => User, (user) => user.appartments)
    user: User


}
