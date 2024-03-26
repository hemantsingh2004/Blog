import express from "express";
import pg from "pg";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {db_password} from "./password.js";
import { correctInfo } from "./register.js";
import { postHandling } from "./postsHandling.js";
const __dirname = dirname(fileURLToPath(import.meta.url));  //Getting the file path to Main
const PORT = 3000;  //Initialized the port for localhost
const app = express();  
const db = new pg.Client({  
    user: "postgres",
    host: "localhost",
    database: "Blog",
    password: db_password,
    port: 5432
});
db.connect();   //Connecting the database
app.use( express.urlencoded({extended: true}));     //Initialized the middleware
app.use(express.static(path.join(__dirname, 'public')));    //Setup the ./public for static files
app.set('views', path.join(__dirname, 'view'));     //Setup ./view for rendering files
app.set('view engine', 'ejs');      //Setup ejs as the engine for rendering files

const user = {  //Will contain the info of current user
    login:false,
    name:"",
    id:null
};

app.get("/", (req, res) => {    //Rendering Up Home Page
    res.render("index.ejs", {user});
})

app.get("/signIn", (req, res) => {  //Rendering Sign In Page
    res.render("signIn.ejs");
})

app.post("/signIn", async (req, res) => {   //Handling Sign In
    const info = req.body;
    const result = await postHandling.signUser(db, info.name, info.pass);
    if(result){
        user.name = result.user_name;
        user.id = result.user_id;
        user.login = true;
        res.redirect("/");
    } else {
        res.render("signIn.ejs", { SignInFlag : true});
    }
    
})

app.get("/register", (req, res) => {    //Rendering Registration Page
    res.render("register.ejs");
})

app.post("/register", async (req, res) => { //Handling Registration
    const info = req.body;
    if(correctInfo(info)){
        const result = await postHandling.registerUser(db, info.name, info.age, info.speciality, info.accType, info.pass);
        user.id = result.user_id;
        user.name = result.user_name;
        user.login = true;
        console.log(user);
        res.redirect("/");
    } else {
        res.render("register.ejs", { registerFlag: true});
    }
})

app.get("/logOut", (req, res) => { //Handling Logout
    user.login = false;
    user.name = "";
    user.id = null;
    res.redirect("/");
})

app.get("/addPost", (req, res) => { //Rendering Post Adding Page
    res.render("addPost.ejs", {user});
})

app.post("/addPost", (req, res) => {    //Handling Addition of Posts
    const info = req.body;
    const date = new Date().toISOString().slice(0,10);
    console.log(info);
    const result = postHandling.addPost(db, user.id, info.heading, String(info.blogPost), date);
    res.redirect("/")
})


app.listen(PORT, () => {        //Setting Up the port for listening
    console.log(`Server running on port ${PORT}.`);
})

//Work On Regex in register.js
//Also maybe on Slide