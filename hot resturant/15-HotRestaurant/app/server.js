var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var reservations = [];
var waitingList = [];

//=====Routes=========
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../home.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "../reservation.html"));
});

// Displays all characters
app.get("/api/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "../tables.html"));
});

// Create New Reservation
app.post("/api/tables", function (req, res) {
    var newReservation = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);
    if (reservations.length < 5) {
        reservations.push(newReservation);
        res.json(newReservation);
    }
    else {
        waitingList.push(newReservation);
        res.json(newReservation);
    }
    console.log(reservations);
    console.log(waitingList);
});

app.listen(PORT, function () {
    console.log("Listening on PORT: " + PORT);
});
