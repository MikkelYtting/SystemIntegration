import { Author, Book } from '../types';

// Resolver for Author type
const AuthorResolver = {
  books: (author: Author, args, { books }): Book[] => {
    return books.filter(book => book.authorId === author.id);
  }
};

export default AuthorResolver;
