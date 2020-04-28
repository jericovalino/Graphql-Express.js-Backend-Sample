const client = require('../dbConnection');

const query = async (qstr) => {
    var data;
    await client.query(qstr)
        .then(({ rows }) => {
            // console.log('database query succesful', rows)
            data = rows.length == 1 ? rows[0] : rows;
        })
    return data
}


module.exports = query;