import express from "express";
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

/**
 * Opret et GraphQL-skema og definer nødvendige resolvere.
 * 
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "World" // data
      },
    },
  }),
});

// Håndter GraphQL-anmodninger på '/graphql' endpointet
app.all('/graphql', createHandler({ schema }));

// Start serveren
const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
