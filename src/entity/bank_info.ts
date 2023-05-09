import { Field, Int, ObjectType } from 'type-graphql'
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@ObjectType()
@Entity()
export class bank_info extends BaseEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    routing_number: number
     
    @Field(()=>String)
    @Column()
    payment_network: string
    
    @Column()
    operator: string

    @Field(()=>String)
    @Column()
    fi_name: string
  }

