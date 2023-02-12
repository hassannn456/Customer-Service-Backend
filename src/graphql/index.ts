import fs from "node:fs";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";
import { getAuthorizedSchema } from "./directives";
import { Admin_users } from "../entity/admin_users";
// import { User } from "custom";
const path = require("path");

const schemaFilePath = path.join(__dirname, "/typedefs/schema.graphql");
// const schemaFilePath = new URL("schema.graphql", import.meta.url);

const typeDefs = fs.readFileSync(schemaFilePath, "utf8");

interface MyContext {
    user?: Admin_users;
  }

export async function createApolloServer(httpServer: any) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const authorizedSchema = getAuthorizedSchema(schema);

  // Our httpServer handles incoming requests to our Express app.`
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.

  const server = new ApolloServer<MyContext>({
    schema: authorizedSchema,
    introspection: true, //process.env.NODE_ENV == 'development',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();
  return server;
}