const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
var listTitle = ""
app.get("/", (req, res)=>{
    listTitle = "Normal"
    typeOfList = req.params.params;
    var date = new Date()
    const options = {
        day: "numeric",
        month: "long"
    }
    var today = date.toLocaleDateString("us-en", options);
    res.render("list", {today:today, items:items,listTitle:listTitle} )
})

app.post("/",(req, res)=>{

    var item = req.body.newItem;

    console.log(req.body.list)
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect("/")
    }
    items.push(item);
});

app.get("/work",(req, res)=>{
    listTitle = "Work"
    res.render("list",{items:workItems, listTitle:listTitle})
})
app.post("/work", (req, res)=>{
    let item =req.body.newItem;
    workItems.push(item);
    res.redirect("/work")
})

app.listen(3000, (err)=>{
    if(err) throw err;
    console.log("Listening on port 3000...")
})
