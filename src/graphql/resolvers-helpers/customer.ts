import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { Nationalities } from "../../entity/nationalities";
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
      },
      getNationalities: async (_: any, arg: any) => {
        try {
          console.log(await Nationalities.find())
          return await Nationalities.find();
        } catch (error) {
          throw new GraphQLError("Could not fetch data.", {
            extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
          });
        }
      },
}
}