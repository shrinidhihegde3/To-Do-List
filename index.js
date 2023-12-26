import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

// to create date and day
const cal = new Date();
const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];
const dayNames = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
];
const date = cal.getDate();
const month = monthNames[cal.getMonth()];
const day = dayNames[cal.getDay()];

var i = "";
var i1 = [];
var j = "";
var j1 = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { day: day, date: date, month: month, item: i1 });
    //render today page
});

app.get("/work", (req, res) => {
    res.render("work.ejs", { day: day, date: date, month: month, items: j1 });
    //render work page
});

app.post("/", (req, res) => {
    i = req.body.newItem; //get the text message 
    if (i) {
        i1.reverse();
        i1.push(i);
        i1.reverse()       // to get the text recently added
        res.redirect("/");
      }
    else{
        res.send('<script>alert("Please type something"); window.location.href = "/";</script>'); 
        //alert the client if submitted without any text
    }
});

app.post("/work", (req, res) => {
    j = req.body.workItem;
    i1.reverse();
    j1.push(j);
    j1.reverse();
    res.redirect("/work");
});

app.post("/delete", (req, res)=>{
    // console.log(req.body.checkbox);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

