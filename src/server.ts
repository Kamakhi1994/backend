import express, { json } from "express";
import cors from "cors";
import { sample_food, sample_tag, sample_user } from "./data";
import jwt from "jsonwebtoken";


const app=express();

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"],
}));
app.get("/api/foods",(req,res)=>{
    res.send(sample_food);
})
app.get("/api/foods/search/:searchterm",(req,res)=>{
    const searchterm=req.params.searchterm;
    const food=sample_food.filter(food=>food.name.toLowerCase().includes(searchterm.toLowerCase()));
    res.send(food);
})
app.get("/api/foods/tags",(req,res)=>{
    res.send(sample_tag);
})
app.get("/api/foods/tag/:tagterm",(req,res)=>{
const tagterm=req.params.tagterm;
const foods=sample_food.filter(food=>
    food.tags?.includes(tagterm));
    res.send(foods);
})
app.get("/api/foods/:foodId",(req,res)=>{
   const foodId= req.params.foodId;
   res.send(sample_food.find(food=>food.id===foodId))
   })
app.get("/api/users",(req,res)=>{
    res.send(sample_user);
})   
app.post('/api/users/login',(req,res)=>{
    const body=req.body;
    const email_body=body.email;
    const password=body.password;
    const user=sample_user.find(users=>users.email===email_body && users.password===password);
    res.send(user);
})   


const port=5000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:"+ port);
})
