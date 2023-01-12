const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
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

app.post('/login',(req,res)=>{
    const {email_phno,password} = req.body;
    console.log(email_phno,password);
    res.status(200).send("Success");
})

app.get('/',(req,res)=>{
    res.send("jerufh");
})

app.listen(process.env.PORT, (data, err) => {
    if (err) {
        console.log("Failed to connect");
        return;
    }
    console.log(`Listening on PORT: ${process.env.PORT}`);
})