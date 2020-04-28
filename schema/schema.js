const graphql = require('graphql');
const dbquery = require('../database/query')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLID,
    GraphQLList } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            async resolve(parent, args) {
                console.log(parent)
                var dt = await dbquery(`SELECT * FROM authors WHERE id = '${parent.authorid}'`);
                return dt;
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                var dt = await dbquery(`SELECT * FROM books WHERE authorid = '${parent.id}'`);
                return dt.length ? dt : [dt];
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return dbquery(`SELECT * FROM books WHERE id = ${args.id}`);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return dbquery(`SELECT * FROM authors WHERE id = ${args.id}`);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return dbquery(`SELECT * FROM books`);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return dbquery(`SELECT * FROM authors`);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})




//these are dummy data

// let books = [
//     { name: "tom and jerry", genre: "cartoon", id: 1, authorId: 1 },
//     { name: "ninja turtles", genre: "cartoon/action", id: 2, authorId: 2 },
//     { name: "ninjas are awesome", genre: "hehehe", id: 3, authorId: 3 },
//     { name: "clash royale", genre: "cartoon", id: 4, authorId: 2 },
//     { name: "clash of clans", genre: "cartoon/action", id: 5, authorId: 3 },
//     { name: "swabelookbook", genre: "hehehe", id: 6, authorId: 3 }
// ]

// let authors = [
//     { name: "jerico", age: 21, id: 1 },
//     { name: "ikoy", age: 31, id: 2 },
//     { name: "tikoy", age: 41, id: 3 }
// ]