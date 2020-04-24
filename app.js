const express = require('express');
const graphqlHTTP = require ('express-graphql');

const schema = require('./schema/schema');

const App = express();

App.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

App.get('/', (req, res) => {
    res.send('welcome to a supercharge API end-point...');
})

App.listen(3000, () => {
    console.log('now listening to port 3000...')
})