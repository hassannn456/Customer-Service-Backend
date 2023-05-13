import { Field, Float, ID, Int, ObjectType } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('payees')
export class Payees extends BaseEntity{
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(()=>String)
    @Column()
    customer_id: string;

    @Field(()=>String )
    @Column({ length: 30, nullable: true })
    account_name: string;

    @Field(()=>String )
    @Column({ length: 16, nullable: true })
    account_number: string;

    @Field(()=>String )
    @Column({ length: 11, nullable: true  })
    routing_number: string;

    @Field(()=>String )
    @Column({ length: 30, nullable: true  })
    display_name: string;

    @Field(()=>String )
    @Column({ nullable: true })
    book_image: string;

    @Field(()=>Boolean )
    @Column({nullable: true })
    active: boolean;

    @Field(()=>String )
    @Column({ nullable: true })
    updated_by: string;

    @Field(()=>String )
    @Column({ nullable: true })
    remark: string;    

    @Field(()=>Date)
    @Column({ type: 'timestamp' })
    created_at: Date;

    @Field(()=>Date)
    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date
}