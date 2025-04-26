import { Field, Float, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExchangeRateGQL {
    @Field()
    country!: string;

    @Field()
    currency!: string;

    @Field(() => Int)
    amount!: number;

    @Field()
    code!: string;

    @Field(() => Float)
    rate!: number;

    @Field(() => GraphQLISODateTime)
    fetchedAt!: Date;
}
