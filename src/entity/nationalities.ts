import { Field, Int, ObjectType } from 'type-graphql'
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@ObjectType()
@Entity("nationalities")
export class Nationalities extends BaseEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number
     
    @Field(()=>String)
    @Column({ length: 60 })
    country: string
    
    @Column({ length: 3 })
    country_code: string

    @Field(()=>Date)
    @Column({ type: 'timestamp' })
    created_at: Date

    @Field(()=>String)
    @Column({ length: 3 })
    un_code: string
  }

