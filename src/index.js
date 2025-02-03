/*const express =require("express");
const cors= require("cors");
const app=express();
app.use(cors({
origin:"*"
}));
app.get('/',(req,res)=>{
res.json({message: "CORS issue resolved"});
})

const port = 8000;
app.listen(port, ()=>console.log('server started on port ${port}'))*/


/*const express =require("express");
const cors= require("cors");
const app=express();
const corsOrigin ={
    origin:'http://localhost:4209', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));*/