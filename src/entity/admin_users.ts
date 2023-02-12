// import { User } from "../types/custom";

// export const Users: User[] = [
//     {
//       id: 1,
//       username: "thor",
//       name: "Thor Odinson",
//       roles: ["customer"],
//       type: "customer",
//       internalNote: "Hello, I am Thor.",
//     },
//     {
//       id: 2,
//       username: "hulk",
//       name: "Bruce Banner",
//       roles: ["customer"],
//       type: "customer",
//       internalNote: "Hello, I am Hulk.",
//     },
//     {
//       id: 2,
//       username: "wasp",
//       name: "Janet van Dyne",
//       roles: ["employee", "invoice-manager"],
//       type: "employee",
//     },
//     {
//       id: 3,
//       username: "hawkeye",
//       name: "Clint Barton",
//       roles: ["employee-readonly", "billing"],
//       type: "employee",
//     },
//   ];

import { IsNotEmpty, Min } from 'class-validator'
import { Field, ObjectType } from 'type-graphql'
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@ObjectType()
@Entity()
export class Admin_users extends BaseEntity {
    @Field(()=>String)
    @PrimaryGeneratedColumn("uuid")
    id: string
     
    @Field(()=>String)
    @Column()
    @Min(6, {message:'Username must not be less than 6 characters'})
    username: string
    
    @Column()
    @Min(6, {message:'Password must not be less than 6 characters'})
    password: string

    @Field(()=>String, { nullable: true } )
    @Column({default: null})
    name: string
  
    @Field(()=>String)
    @Column()
    @IsNotEmpty()
    roles: string

    // @Field(()=>String, { nullable: true } )
    // @Column({default: null})
    // type: string
  }

