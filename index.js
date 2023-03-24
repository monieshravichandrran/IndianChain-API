const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const RequestService = require("./controllers/request");
const JobService = require("./controllers/jobService");
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


app.post("/get-requests", async (req, res) => {
  res.send(await RequestService.getAllRequests(req.body.email));
});

app.post("/add-request", async (req, res) => {
  res.send(await RequestService.addRequest(req.body.citizen, req.body.authority, req.body.type))
});

app.post("/delete-request", async (req, res) => {
  res.send(await RequestService.deleteRequest(req.body.citizen, req.body.authority, req.body.type));
});

app.post("/post-job", async (req, res) => {
  res.send(await JobService.addJob(req.body.organization, req.body.description, req.body.title));
});

app.post("/get-job", async (req, res) => {
  res.send(await JobService.getJob(req.body.email));
});

app.post("/get-job", async (req, res) => {
  res.send(await JobService.getJobByType(req.body.type));
});

app.post("/get-all-jobs", async (req, res) => {
  res.send(await JobService.getAllJob());
});

app.post("/delete-job", async (req, res) => {
  res.send(await JobService.deleteJob(req.body.organization, req.body.description, req.body.title));
})

app.listen(process.env.PORT, (data, err) => {
  if (err) {
    console.log("Failed to connect");
    return;
  }
  console.log(`Listening on PORT: ${process.env.PORT}`);
})