// import { ApolloServerErrorCode } from '@apollo/server/errors';
// import { GraphQLError } from 'graphql';
// // import { UserInputError } from "apollo-server-express";
// import { Users } from "../../models/users";
// import { Invoices } from "../../models/invoices";

// export const customersResolvers = {
//   Mutation: {
//     updateCustomer: async (_: any, arg: { customerId: any, name: any }) => {
//       const customer = Users.find(
//         (user) => user.id === arg.customerId && user.type === "customer"
//       );
//       // const customer = await Users.findOne({where: {id: arg.customerId, type: "customer"}})
//       if (!customer) {
//         throw new GraphQLError("User not found", {
//             extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
//           });
//       }
//       customer.name = arg.name;
//       return customer;
//     }
//   },
//   Query: {
//     me: async (root: any, args: any, context: any) => {
//       const id = context.user.id;
//       // return await Users.findOne({where: {id: id, type: args.type}})
//       return Users.find((user) => user.id === id && user.type === "customer");
//     },
//     customers: async () => {
//       return Users.filter((user) => user.type === "customer");
//       // return await Users.findOne({where: {type: "customer"}})

//     },
//     getCustomerInvoices(root: any, args: any) {
//       const customerId = args.customerId;
//       const invoices = Invoices.filter(
//         (invoice) => invoice.customerId === customerId
//       );
//       return invoices;
//     },
//   },
//   Customer: {
//     invoices: (customer: any) => {
//       const invoices = Invoices.filter(
//         (invoice) => invoice.customerId === customer.id
//       );
//       return invoices;
//     },
//   },
// };