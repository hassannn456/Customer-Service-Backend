import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { Customer } from "../../entity/customer";


export const customerResolvers = {
  Query: {
    getCustomers: async (_: any, arg: any) => {
        try {         
            return await Customer.find();
          } catch (error) {
            throw new GraphQLError("Could not fetch data.", {
              extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
            });
          }
      }
}
}