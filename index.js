import express from "express";
const app = express();

import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

import { correctInfo } from "./register.js";
const user = {
    login:false,
    name:""
};
let users = {
    "hemant":{pass:"Hemant87", age:19}
};

app.use( express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs", {user});
})

app.get("/signIn", (req, res) => {
    res.render("signIn.ejs");
})

app.post("/signIn", (req, res) => {
    const info = req.body;
    if(info.name in users){
        user.login = true;
        user.name = info.name;
    }
    res.redirect("/");
})

app.get("/logOut", (req, res) => {
    user.login = false;
    user.name = "";
    res.redirect("/");
})

app.get("/register", (req, res) => {
    res.render("register.ejs");
})

app.post("/register", (req, res) => {
    const info = req.body;
    if(correctInfo(info)){
        users[info.name] = {pass: info.pass, age: Number(info.age)};
        user.login = true;
        user.name = info.name;
        console.log(users);
        // res.render("index.ejs", {user});
        res.redirect("/");
    } else {
        res.render("register.ejs", { registerFlag: true});
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
})