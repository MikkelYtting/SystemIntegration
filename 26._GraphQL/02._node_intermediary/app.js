import express from "express";
import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { graphqlHTTP } from "express-graphql";

const app = express();

let movieId = 4;
const movies = [
    { id: 1, title: "The Unbearable Weight of Massive Talent", actorIds: [1] },
    { id: 2, title: "Pig", actorIds: [1] },
    { id: 3, title: "One Flew Over the Cuckoo's Nest", actorIds: [2] },
    { id: 4, title: "Junior", actorIds: [2, 3] },
];

let actorId = 3;
const actors = [
    { id: 1, name: "Nicolas Cage" },
    { id: 2, name: "Danny DeVito" },
    { id: 3, name: "Arnold Schwarzenegger" },
];

// Definerer GraphQL-typer og resolvere for skuespillere og film
const ActorType = new GraphQLObjectType({
    name: "Actor",
    description: "En skuespiller",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        movies: { 
            type: new GraphQLList(MovieType),
            resolve: (actor) => movies.filter(movie => movie.actorIds.includes(actor.id))
        }
    })
});

const MovieType = new GraphQLObjectType({
    name: "Movie",
    description: "En film",
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        actorIds: { type: new GraphQLList(GraphQLInt) },
        actors: {
            type: new GraphQLList(ActorType),
            description: "Få alle skuespillere tilknyttet en film",
            resolve: (movie) => movie.actorIds.map(actorId => actors.find(actor => actor.id === actorId))
        }
    }
});

// Definerer mutationer for at tilføje film og skuespillere
const RootMutationType = new GraphQLObjectType({
    name: "RootMutationType",
    fields: {
        addMovie: {
            type: MovieType,
            description: "Opret en ny film",
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                actorIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLInt)) }
            },
            resolve: (parent, args) => {
                const foundActors = args.actorIds.map(actorId => actors.find(actor => actor.id === actorId));
                if (foundActors.includes(undefined)) return;

                const movie = {
                    id: ++movieId,
                    title: args.title,
                    actorIds: args.actorIds
                };
                movies.push(movie);
                return movie;
            }
        },
        addActor: {
            type: ActorType,
            description: "Opret en ny skuespiller",
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, { name }) => {
                const actor = {
                    id: ++actorId,
                    name
                };
                actors.push(actor);
                return actor;
            }
        }
    }
});

// Definerer forespørgsler for at hente film og skuespillere
const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        movies: {
            type: new GraphQLList(MovieType),
            description: "Alle film",
            resolve: () => movies
        },
        actors: {
            type: new GraphQLList(ActorType),
            description: "Alle skuespillere",
            resolve: () => actors
        },
        actorById: {
            type: ActorType,
            description: "Få en enkelt skuespiller",
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => actors.find(actor => actor.id === args.id)
        }
    }
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

// Opretter GraphQL endpoint
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

// Starter serveren
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
