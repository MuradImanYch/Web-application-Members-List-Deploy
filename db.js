const db = require('mysql');

const con = db.createConnection({
    host: "eu-cdbr-west-03.cleardb.net",
    user: "bfc35abc76ceef",
    password: "f3bd1c77",
    database: "heroku_c4bd331d2ca18ef"
});
con.connect(err => {
    if(err) throw err;
    console.log('Connected to DB');
});

module.exports = con;