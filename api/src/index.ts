import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import { altairExpress } from 'altair-express-middleware';
import { graphqlUploadExpress } from 'graphql-upload';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

dotenv.config();

async function main() {
  const prisma = new PrismaClient();

  const app = express();
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
  if (process.env.NODE_ENV === 'development')
    app.use(altairExpress({ endpointURL: '/graphql/', baseURL: '/graphql/' }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: false,
    context: {
      prisma,
    },
    uploads: false,
  });

  server.start();

  server.applyMiddleware({ app, path: '/' });

  // @ts-ignore
  await new Promise((resolve) => app.listen({ port: 5000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

main();
