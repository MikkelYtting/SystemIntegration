
// npm install apollo-server graphql
// node server.js
const { ApolloServer, gql } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

// Sample data
let books = [
    { id: '1', title: '1984', releaseYear: 1949, authorId: '1' },
    { id: '2', title: 'Animal Farm', releaseYear: 1945, authorId: '1' },
];

let authors = [
    { id: '1', name: 'George Orwell' },
];

// Type definitions (schema)
const typeDefs = gql`
    ${require('fs').readFileSync('./schema.graphql', 'utf8')}
`;

// Resolvers
const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find(book => book.id === id),
        authors: () => authors,
        author: (_, { id }) => authors.find(author => author.id === id),
    },
    Mutation: {
        createBook: (_, { authorId, title, releaseYear }) => {
            const newBook = { id: uuidv4(), authorId, title, releaseYear };
            books.push(newBook);
            return newBook;
        },
        updateBook: (_, { id, authorId, title, releaseYear }) => {
            const bookIndex = books.findIndex(book => book.id === id);
            if (bookIndex === -1) return null;
            const updatedBook = {
                ...books[bookIndex],
                authorId: authorId || books[bookIndex].authorId,
                title: title || books[bookIndex].title,
                releaseYear: releaseYear || books[bookIndex].releaseYear
            };
            books[bookIndex] = updatedBook;
            return updatedBook;
        },
        deleteBook: (_, { id }) => {
            books = books.filter(book => book.id !== id);
            return { message: 'Book deleted successfully' };
        }
    },
    Book: {
        author: (book) => authors.find(author => author.id === book.authorId)
    },
    Author: {
        books: (author) => books.filter(book => book.authorId === author.id)
    }
};

// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
