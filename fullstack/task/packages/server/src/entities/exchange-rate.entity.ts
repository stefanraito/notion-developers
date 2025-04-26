import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'exchange_rates' })
export class ExchangeRateEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    country!: string;

    @Column()
    currency!: string;

    @Column('int')
    amount!: number;

    @Column()
    code!: string;

    @Column('decimal', { precision: 12, scale: 4 })
    rate!: number;

    @Column({
        name: 'fetched_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    fetchedAt!: Date;
}
