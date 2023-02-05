const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const cheerio = require("cheerio");
const axios = require("axios");
const authentication = require("./controllers/authentication");
const fs = require("fs");
const Permission = require("./controllers/permission");
const UserService = require("./controllers/users");
const RequestService = require("./controllers/request");
const pretty = require("pretty");

dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOOSE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then((data, err) => {
    if (err) {
        console.log("Db connection failed");
        return;
    }
    console.log("Connected to database");
});

app.post('/signup', async (req, res) => {
    const response = await authentication.signup(req.body);
    if (response == "SignUp Successful")
        res.status(200).send(response);
    else
        res.status(200).send(response)
})

app.post('/login', async (req, res) => {
    const { email, password, address } = req.body;
    const response = await authentication.login(email, password, address);
    if (response == "Valid Authentication")
        res.status(200).send(response);
    else
        res.status(200).send(response);
})

app.get('/health-check', (req, res) => {
    res.status(200).send("API RUNNING");
})

app.post('/get-doc', async(req, res) => {
    const data = req.body;
    let fileLinks = [];
    for(ascii of data){
        const html = await axios.get("https://ipfs.io/ipfs/" + ascii);
        const $ = cheerio.load(pretty(html.data));
        const table = $('td>a');
        fileLinks.push("https://ipfs.io"+table[0].attribs.href);
    }
    res.send(fileLinks);
})

app.post("/give-permission", async(req, res) => {
    res.send(await Permission.givePermission(req.body.citizen, req.body.authority, req.body.type));
})

app.post("/get-address",async(req,res)=>{
    res.send(await UserService.getAddress(req.body.email));
})

app.post("/get-requests",async(req,res)=>{
    res.send(await RequestService.getAllRequests(req.body.email));
})

app.post("/add-request",async(req,res)=>{
    res.send(await RequestService.addRequest(req.body.citizen, req.body.authority, req.body.type))
})

app.listen(process.env.PORT, (data, err) => {
    if (err) {
        console.log("Failed to connect");
        return;
    }
    console.log(`Listening on PORT: ${process.env.PORT}`);
})