import jwt from "jsonwebtoken";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
// import { UserInputError } from "apollo-server-express";
import { Admin_users } from "../../entity/admin_users";
import { JWT_SECRET } from "../../config";
import * as bcrypt from "bcrypt";
import Validators from "../../helpers/validator";

export const authResolvers = {
  Mutation: {
    signUp: async (_: any, arg: Admin_users): Promise<Admin_users | undefined> => {
      const users = await Admin_users.findOneBy({ username: arg.username });
      if (users) {
        throw new GraphQLError("Username already taken", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      const user = new Admin_users();

      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(arg.password, 12);
      } catch (err) {
        throw new GraphQLError("Could not create user, please try again.", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      user.username = arg.username;
      user.password = hashedPassword;
      user.name = arg.name;
      user.roles = arg.roles;

      // const errors = await validate(user, { validationError: { target: false }})
      const errors = Validators(user)

      if (errors.length > 0) {
        console.log(errors)
      throw new GraphQLError(errors , {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });
      }

      try {
        return await user.save();
      } catch (error) {
        throw new GraphQLError("Could not create user", {
          extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
        });
      }
    },
    login: async (
      _: any,
      arg: { username: string; password: string }
    ): Promise<{ token: string; role: string }> => {
      const users = await Admin_users.findOneBy({ username: arg.username });
      if (!users) {
        throw new GraphQLError("Username not found", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      let isValidPassword: boolean;
      try {
        isValidPassword = await bcrypt.compare(arg.password, users.password);

        if (!isValidPassword) {
          throw new GraphQLError("Invalid Password.", {
            extensions: {
              code: "FORBIDDEN",
            },
          });
        }

        const token = jwt.sign(
          { id: users.id, roles: users.roles },
          JWT_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "24hr",
          }
        );
        return { token, role: users.roles };
      } catch (err) {
        throw new GraphQLError(
          "Could not log you in, please check your credentials and try again.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }
    },
    deleteUser: async (_: any, arg: { recordId: string }): Promise<String> => {
      try {
        const del = await Admin_users.delete(arg.recordId);
        if (del.affected === 0) {
          throw new GraphQLError("User not found for the provided id", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
          });
        } else {
          return "User deleted";
        }
      } catch (error) {
        throw new GraphQLError("User not found for the provided id", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
    },
    findByUsername: async (
      _: any,
      arg: { username: string }
    ): Promise<Admin_users | undefined> => {
      try {
        const users = await Admin_users.findOneBy({ username: arg.username });
        if (users !== null) {
          return Promise.resolve(users);
        } else {
          throw new GraphQLError("User not found for the provided username", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
          });
        }
      } catch (error) {
        throw new GraphQLError("User not found for the provided username", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
    },
    findById: async (
      _: any,
      arg: { recordId: string }
    ): Promise<Admin_users | undefined> => {
      try {
        const users = await Admin_users.findOneBy({ id: arg.recordId });
        if (users) {
          return Promise.resolve(users);
        }
      } catch (error) {
        throw new GraphQLError("User not found for the provided id", {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
    },
  },
  Query: {
    health: () => "OK",
    getUsers: async (_: any, arg: any) => {
      try {
        return await Admin_users.find();
      } catch (error) {
        throw new GraphQLError("Could not fetch data.", {
          extensions: { code: ApolloServerErrorCode.BAD_REQUEST },
        });
      }
    },
  },
};
