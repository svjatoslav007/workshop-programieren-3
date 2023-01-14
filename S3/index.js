const express = require("express");
const app =express();

app.use(express.static("../GOL"));

 app.get("/", function(req, res){
     res.redirect("/index.html");
 })

app.get("/", function(req, res){
    res.send("wallah kriese")
});


app.listen(3000,function(){
    console.log("server leuft auf port 3000")
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
 });

 app.get("/google/:search", function(req, res){
    let search =req.params.search;
    res.redirect("http://google.com/search?q="+search) ;
 });
 app.get("/*", function(req, res){
    res.status(404).send("<h1>Error 404</h1>") ;
 });


 
 app.listen(3000,function(){
     console.log("GOL")
 })