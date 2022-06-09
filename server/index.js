const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_schema'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Create
app.post("/api/insert", (req, res) => {
    const filmName = req.body.name;
    const filmReview = req.body.desc;

    const sqlInsert = ""+
        "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);"+
    "";

    db.query(sqlInsert, [filmName, filmReview], (err, result) => {
        res.send("Server Working 3");
    });
})

//Read
app.get("/api/get", (req, res) => {
    const sqlGet = ""+
        "SELECT * FROM movie_reviews"+
    "";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    });
})

//Update
app.put("/api/update/:MovieID", (req, res) => {
    const filmID = req.params.MovieID;
    const filmName = req.body.name;
    const filmReview = req.body.desc;

    const sqlUpdate = ""+
        "UPDATE movie_reviews SET movieName = ?, movieReview = ? WHERE id = ?"+
    "";

    db.query(sqlUpdate, [filmName, filmReview, filmID], (err, result) => {
        if (err) console.log(err);
    });
})

//Delete
app.delete("/api/delete/:MovieID", (req, res) => {
    const filmID = req.params.MovieID;

    const sqlDelete = ""+
        "DELETE FROM movie_reviews WHERE id = ?"+
    "";

    db.query(sqlDelete, filmID, (err, result) => {
        if (err) console.log(err);
    });
})

app.listen(3001, () => {
    console.log("running in port 3001");
});