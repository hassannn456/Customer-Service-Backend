import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity("customer")
export class Customer extends BaseEntity{
  @Field(()=>String)  
  @PrimaryColumn()
  customer_id: string

  @Field(()=>String) 
  @Column()
  company_id: string

  @Field(()=>String)
  @Column()
  user_id: string

  @Field(()=>String) 
  @Column()
  device_id: string

  @Field(()=>String)
  @Column()
  fname_th: string

  @Field(()=>String)
  @Column()
  mname_th: string

  @Field(()=>String)
  @Column()
  lname_th: string

  @Field(()=>String)
  @Column()
  fullname_th: string

  @Field(()=>String)
  @Column()
  fname_en: string

  @Field(()=>String)
  @Column()
  mname_en: string

  @Field(()=>String)
  @Column()
  lname_en: string

  @Field(()=>String)
  @Column()
  fullname_en: string

  @Field(()=>String)
  @Column()
  national_id: string

  @Field(()=>String)
  @Column()
  passport: string

  @Field(()=>String)
  @Column()
  laser_code: string

  @Field(()=>String)
  @Column()
  dob: string

  @Field(()=>String)
  @Column()
  issue_date: string

  @Field(()=>String)
  @Column()
  expire_date: string

  @Field(()=>String)
  @Column()
  image_card: string

  @Field(()=>String)
  @Column()
  image_face: string

  @Field(()=>String)
  @Column()
  dopa: string

  @Field(()=>String)
  @Column()
  pin: string

  @Field(()=>String)
  @Column()
  risk_factor: number

  @Field(()=>String)
  @Column()
  risk_reason: string

  @Field(()=>String)
  @Column()
  created_at: number

  @Field(()=>String)
  @Column()
  updated_at: number

  @Field(()=>String)
  @Column()
  wallet: string

  @Field(()=>Boolean )
  @Column("boolean", { default: false })
  is_approved: boolean

  @Field(()=>Int)
  @Column("int", { default: 0 })
  pin_attempts: number

  @Field(()=>String)
  @Column({ nullable: false })
  nationality: string
}
