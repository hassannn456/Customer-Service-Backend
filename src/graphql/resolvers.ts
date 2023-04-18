import { authResolvers } from "./resolvers-helpers/auth";
import { payeesResolvers } from "./resolvers-helpers/bankpayees";
import { customerResolvers } from "./resolvers-helpers/customer";
// import { customersResolvers } from "./resolvers-helpers/customers";
// import { employeeResolvers } from "./resolvers-helpers/employee";

const resolvers = {
  Mutation: {
    ...authResolvers.Mutation,
    ...payeesResolvers.Mutation,
    // ...customersResolvers.Mutation,
    // ...employeeResolvers.Mutation
  },
  Query: {
    ...authResolvers.Query,
    ...payeesResolvers.Query,
    ...customerResolvers.Query
    // ...customersResolvers.Query,
  }
};

export default resolvers;