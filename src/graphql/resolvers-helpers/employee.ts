// import { ApolloServerErrorCode } from '@apollo/server/errors';
// import { GraphQLError } from 'graphql';
// // import { UserInputError } from "apollo-server-express";
// import { Users } from "../../models/users";

// export const employeeResolvers = {
//   Mutation: {
//     updateEmployeeRole: (_: any, arg: { employeeId: any, role: any }) => {
//       const employee = Users.find(
//         (user) => user.id === arg.employeeId && user.type === "employee"
//       );
//       if (!employee) {
//         throw new GraphQLError("User not found", {
//             extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
//           });
//       }
//       employee.roles.push(arg.role);
//       return true;
//     },
//   },
// };