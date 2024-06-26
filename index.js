import express from "express";
import pg from "pg";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {credentials} from "./credentials.js";
import { correctInfo } from "./register.js";
import { postHandling } from "./postsHandling.js";
const __dirname = dirname(fileURLToPath(import.meta.url));  //Getting the file path to Main
const PORT = 3000;  //Initialized the port for localhost
const app = express();  
const db = new pg.Client({  
    user: credentials.user,
    host: credentials.host,
    database: credentials.database,
    password: credentials.password,
    port: credentials.port
});
db.connect();   //Connecting the database
app.use( express.urlencoded({extended: true}));     //Initialized the middleware
app.use(express.static(path.join(__dirname, 'public')));    //Setup the ./public for static files
app.set('views', path.join(__dirname, 'view'));     //Setup ./view for rendering files
app.set('view engine', 'ejs');      //Setup ejs as the engine for rendering files
app.use('/svg/yourPost', express.static(__dirname + '/public/svg/yourPost'));

const user = {  //Will contain the info of current user
    login:false,
    name:"",
    id:null,
    editingPermissions:false
};

const blogs = {
    offset: 0
};

app.get("/", (req, res) => {    //Rendering Up Home Page
    res.render("main/index.ejs", {user});
})

app.get("/signIn", (req, res) => {  //Rendering Sign In Page
    res.render("signIn/signIn.ejs");
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
        res.render("signIn/signIn.ejs", { SignInFlag : true});
    }
    
})

app.get("/register", (req, res) => {    //Rendering Registration Page
    res.render("register/register.ejs");
})

app.post("/register", async (req, res) => { //Handling Registration
    const info = req.body;
    if(correctInfo(info)){
        const result = await postHandling.registerUser(db, info.name, info.age, info.speciality, info.accType, info.pass);
        user.id = result.user_id;
        user.name = result.user_name;
        user.login = true;
        // console.log(user);
        res.redirect("/");
    } else {
        res.render("register/register.ejs", { registerFlag: true});
    }
})

app.get("/logOut", (req, res) => { //Handling Logout
    user.login = false;
    user.name = "";
    user.id = null;
    res.redirect("/");
})

app.get("/addPost", (req, res) => { //Rendering Post Adding Page
    res.render("addPost/addPost.ejs", {user});
})

app.post("/addPost", async (req, res) => {    //Handling Addition of Posts
    const info = req.body;
    const date = new Date().toISOString().slice(0,10);
    const result = await postHandling.addPost(db, user.id, info.heading, String(info.blogPost), date);
    res.redirect("/");
})

app.get("/blogs", async (req, res) => {   //Showing all the blogs
    res.render("blogs/blog.ejs", {user});
})

app.get("/yourPost", async (req, res) => {
    res.render("yourPost/yourPost.ejs", {user});
})

app.get("/api/blogs/?", async(req, res) => { //API for displaying blogs
    const offset = req.query.offset;
    const limit = req.query.limit;
    let user = undefined;
    if(req.query.userID){
        user = req.query.userID;
    }
    const data = await postHandling.getblogs(db, limit, offset, user);
    res.json(data);
})

app.get("/api/deleteBlog/:blogId?", async(req, res) => {    //API for deleting blogs
    const blogId = parseInt(req.params.blogId);
    if(user.login === true){
        if(await postHandling.userOwnBlog(db, user.id, blogId)){
            await postHandling.deleteBlog(db, blogId);
        }
    }
    res.redirect("/yourPost");
})

app.get("/blogs/:blogId?", async(req, res) => {   //Showing the blogs
    const blogId = req.params.blogId;
    const blog = await postHandling.getPost(db, blogId);
    res.render("showBlogs/showPost.ejs", {user, blog});
})

app.get("/edit/:blogId?", async(req, res) => {
    const blogId = parseInt(req.params.blogId);
    const blog = null;
    if(user.login === true){
        if(await postHandling.userOwnBlog(db, user.id, blogId)){
            user.editingPermissions = true;
            const blog = await postHandling.getPost(db, blogId);
            res.render("yourPost/editPost.ejs", {user, blog});       
        }else{
            res.render("yourPost/editPost.ejs", {user, blog})
        }
    }else{
        res.render("yourPost/editPost.ejs", {user, blog});
    }
})

app.post("/edit/:blogId&:userId?", async(req, res) => {
    const blogId = parseInt(req.params.blogId);
    const userId = parseInt(req.params.userId);
    if(user.login === true){
        if(userId === user.id){
            if(await postHandling.userOwnBlog(db, user.id, blogId)){
                const info = req.body;
                const date = new Date().toISOString().slice(0,10);
                await postHandling.editPost(db, blogId, String(info.blogPost), date);
                console.log("process completed");
            }
        }
    }
    res.redirect("/");
})


app.listen(PORT, () => {        //Setting Up the port for listening
    console.log(`Server running on port ${PORT}.`);
})