const express = require("express")
const app = express()
const port = process.env.port || 4141;

const logger = require("morgan")
app.use(logger("dev"))

const bodyParser =require("body-parser")
app.use(bodyParser.json())

const db = require("./models")
db.mongoose
    .connect(db.url)
    .then(() =>{
        console.log(`connected to the databases ${db.url}`);
    })
    .catch( err =>{
        console.log(`Cannot connect to the database ${db.url} !`, err);
})

require("./routes/movies.routes.js")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

// app.post("/movies", movie)

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
})