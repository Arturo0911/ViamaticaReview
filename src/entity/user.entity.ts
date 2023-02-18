
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, BeforeInsert } from "typeorm";
import  {Appartment} from './appartment.entity';
import bcrypt from 'bcryptjs';
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @CreateDateColumn({select: false})
    createdAt: Date

    @CreateDateColumn({select: false})
    modifiedAt: Date

    @CreateDateColumn({select: false})
    deletedAt: Date

    @Column({default: true,select: false})
    status: boolean


    @Column({length:50})
    phoneNumber: string

    @Column()
    email: string
    
    @Column({select: false})
    password: string

    @OneToMany(()=> Appartment, (appartment) => appartment.user)
    appartments: Appartment[]

    // @BeforeInsert()
    // async hashPassword(){
    //     console.log("before ", this.password);
        
    //     this.password = await bcrypt.hash(this.password, 12);
    //     console.log("after ", this.password);
        
    // }


    // static async comparePasswords(
    //     possiblePassword: string,
    //     hashedPassword: string){
    //         return await bcrypt.compare(possiblePassword, hashedPassword);
    // }
}
