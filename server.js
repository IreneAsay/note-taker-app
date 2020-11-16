const fs = require("fs");
const express = require("express");
const path = require("path");
const { json } = require("express");

const app = express();

const PORT = process.env.PORT || 8080;
let allNotes = [];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes/", (req, res) => {
    allNotes = fs.readFileSync("./db/db.json", "utf8");
    allNotes = JSON.parse(allNotes);
    res.json(allNotes);
});

app.post("/api/notes", (req, res) => {
    allNotes = fs.readFileSync("./db/db.json", "utf8");
    allNotes = JSON.parse(allNotes);
    req.body.id = allNotes.length;
    allNotes.push(req.body);
    allNotes = JSON.stringify(allNotes);
    fs.writeFileSync("./db/db.json", allNotes);
    allNotes = JSON.parse(allNotes);
    res.json(allNotes);
});

app.delete("/api/notes/:id", (req, res) => {
allNotes = fs.readFileSync("./db/db.json", "utf8");
allNotes = JSON.parse(allNotes);
allNotes = allNotes.filter((currentNote) => {
    return currentNote.id != req.params.id;
})


allNotes = JSON.stringify(allNotes);
fs.writeFileSync("./db/db.json", allNotes);
allNotes = JSON.parse(allNotes);
res.json(allNotes);
});

app.listen(PORT, () => {
    console.log(`App is running on the http://localhost:${PORT}`);
});