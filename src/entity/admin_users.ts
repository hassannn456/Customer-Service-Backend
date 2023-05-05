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
    username: string
    
    @Column()
    password: string

    @Field(()=>String, { nullable: true } )
    @Column({default: null})
    name: string
  
    @Field(()=>String)
    @Column()
    roles: string

    @Field(()=>Date)
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Field(()=>Date)
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date
  }

