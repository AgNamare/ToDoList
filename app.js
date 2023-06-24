const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];

app.get("/", (req, res)=>{
    var date = new Date()
    const options = {
        year: "numeric",
        day: "numeric",
        month: "long"
    }
    var today = date.toLocaleDateString("us-en", options);
    res.render("list", {today:today, items:items} )
})

app.post("/",(req, res)=>{
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/")
})

app.listen(3000, (err)=>{
    if(err) throw err;
    console.log("Listening on port 3000...")
})
