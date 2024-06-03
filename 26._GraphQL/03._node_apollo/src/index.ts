import { ApolloServer } from '@apollo/server';
import { gql } from 'apollo-server';
import { createServer } from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';

import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import Subscription from './resolvers/Subscription.js';
import Book from './resolvers/Book.js';
import Author from './resolvers/Author.js';

const app = express();
const httpServer = createServer(app);

// Læs og indlæs GraphQL-skema fra fil
const schemaPath = path.resolve('src/graphql/schema.graphql');
const schemaFile = fs.readFileSync(schemaPath, 'utf8');
const typeDefs = gql(schemaFile);

// Definer resolvers
const resolvers = {
  Query,
  Mutation,
  Subscription,
  Book,
  Author
};

// Opret det eksekverbare skema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Opsæt WebSocket server for GraphQL
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Start WebSocket server med det oprettede skema
const serverCleanup = useServer({ schema }, wsServer);  

// Opret og start Apollo server
const server = new ApolloServer({ 
  schema,
  introspection: true,  // Aktivér introspektion for feltsbeskrivelser
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      }
    }
  ],
});

await server.start();

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

const PORT = 4000;

// Start HTTP serveren
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
