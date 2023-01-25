import 'dotenv/config';
import express from "express";
import { expressjwt } from "express-jwt";
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { createApolloServer } from "./graphql/index.js";
import { JWT_SECRET } from "./config.js";
import { getUser } from "./util/jwt.utils.js";

async function createApp() {
  const app = express();

  app.use(
    expressjwt({
      secret: JWT_SECRET,
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );

  const httpServer = http.createServer(app);

  const server = await createApolloServer(httpServer);

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        // Extracting the user token from the headers
//        token: req.headers.authorization || ''
      
        // Retrieving a user with the token
        user: getUser(req.headers.authorization || '')
      })
//      context: async ({ req }) => ({ user: req.auth }),
    })
  );

//  server.applyMiddleware({ app });

  return app;
}

(async () => {
  const app = await createApp();

  app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000/graphql`)
  );
})();