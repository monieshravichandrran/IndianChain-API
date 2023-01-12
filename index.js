const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const authentication = require("./controllers/authentication");

dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOOSE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then((data,err)=>{
    if(err){
        console.log("Db connection failed");
        return;
    }
    console.log("Connected to database");
});

app.post('/signup',async(req,res)=>{
    const response = await authentication.signup(req.body);
    if(response == "SignUp Successful")
        res.status(200).send(response);
    else
        res.status(200).send(response)
})

app.post('/login',async(req,res)=>{
    console.log(req.body);
    const { email,password,address } = req.body;
    const response = await authentication.login(email,password,address);
    if(response == "Valid Authentication")
        res.status(200).send(response);
    else
        res.status(200).send(response);
})

app.get('/health-check',(req,res)=>{
    res.status(200).send("API RUNNING");
})

app.listen(process.env.PORT, (data, err) => {
    if (err) {
        console.log("Failed to connect");
        return;
    }
    console.log(`Listening on PORT: ${process.env.PORT}`);
})