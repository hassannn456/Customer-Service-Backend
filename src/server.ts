import 'dotenv/config';
import express from "express";
import { expressjwt } from "express-jwt";
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import "reflect-metadata";

import DataStore from './datastore';
import { createApolloServer } from "./graphql/index";
import { JWT_SECRET } from "./config";
import { getUser } from "./util/jwt.utils";

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
    cors<cors.CorsRequest>({ origin: process.env.FRONTEND_ORIGINS, credentials: true}),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        // Extracting the user token from the headers
      //  token: req.headers.authorization || '',
      
        // Retrieving a user with the token
        user: getUser(req.headers.authorization || '')
      })
    //  context: async ({ req }) => ({ user: req.auth }),
    })
  );

//  server.applyMiddleware({ app });
  return app;
  
}


(async () => {
  const app = await createApp();

  DataStore.initialize()
  .then(()=>{
    app.listen({ port: process.env.SERVER_PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.SERVER_PORT}/graphql`)
  );  
  })
  .catch(err=> console.log(err, "Error connecting"))
})();

