import jwt from "jsonwebtoken";
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
// import { UserInputError } from "apollo-server-express";
import { Users } from "../models/users.js";
import { JWT_SECRET } from "../config.js";
import { Invoices } from "../models/invoices.js";

export const resolvers = {
  Mutation: {
    login: (_: any, arg: { username: any }) => {
      const user = Users.find((user) => user.username === arg.username);
      if (!user) {
        throw new GraphQLError("User not found", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
          });
      }
      const token = jwt.sign({ id: user.id, roles: user.roles }, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "10m",
      });
      return { token };
    },
    updateCustomer: (_: any, arg: { customerId: any, name: any }) => {
      const customer = Users.find(
        (user) => user.id === arg.customerId && user.type === "customer"
      );
      if (!customer) {
        throw new GraphQLError("User not found", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
          });
      }
      customer.name = arg.name;
      return customer;
    },
    updateEmployeeRole: (_: any, arg: { employeeId: any, role: any }) => {
      const employee = Users.find(
        (user) => user.id === arg.employeeId && user.type === "employee"
      );
      if (!employee) {
        throw new GraphQLError("User not found", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
          });
      }
      employee.roles.push(arg.role);
      return true;
    },
  },
  Query: {
    health: () => "OK",
    me: (root: any, args: any, context: any) => {
      const id = context.user.id;
      return Users.find((user) => user.id === id && user.type === "customer");
    },
    customers: () => {
      return Users.filter((user) => user.type === "customer");
    },
    getCustomerInvoices(root: any, args: any) {
      const customerId = args.customerId;
      const invoices = Invoices.filter(
        (invoice) => invoice.customerId === customerId
      );
      return invoices;
    },
  },
  Customer: {
    invoices: (customer: any) => {
      const invoices = Invoices.filter(
        (invoice) => invoice.customerId === customer.id
      );
      return invoices;
    },
  },
};