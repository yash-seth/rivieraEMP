const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors")
const app = express();

const eventData = require("./models/rivieraEvents");
const userData = require("./models/participants");
const eventRegData = require("./models/eventRegistrations");

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://yash_seth:easytoremember@cluster0.egbzd.mongodb.net/riviera?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

//routes for events collection

app.post("/events",async (req,res)=>{
    console.log(req.body)
    const event = new eventData({event_code: req.body.event_code, event_name: req.body.event_name, event_start_timestamp: req.body.event_start_time, event_end_timestamp: req.body.event_end_time, event_location: {lat: req.body.event_location.lat, lon: req.body.event_location.lon}, event_capacity: parseInt(req.body.event_capacity, 10)});

    try{
        await event.save();
        console.log("Entry inserted");
    }catch(error){
        console.log(error);
    }
})

app.get("/events",async (req,res)=>{
    eventData.find({},(err, result) => {
        if(err) res.send(err)
        res.send(result)
    })
})

app.get("/events/:id",async (req,res)=>{
    eventData.find({event_code: req.params.id}, (err, result) => {
        if(err) res.send(err)
        res.send(result)
    })
})

app.delete("/events/:id", async (req,res)=>{
    var id = req.params.id;
    const result = eventData.deleteOne({event_code: id}).then(event => {
        if(!event) return res.status(404).end()
        return res.status(200)
    }).catch(err => console.log(err))
})

app.patch('/events/:id', (req, res) => {
    eventData.findOneAndUpdate({event_code:req.params.id}, req.body, function (err, event) {
        res.send(event);
      });
})

//routes for users collection

app.post("/verify", (req, res) => {
    userData.find({username: req.body.username, password: req.body.password}, (err, result) => {
        if(err) res.send(err)
        console.log(result)
        res.send(result)
    })
  });


  app.post("/register",async (req,res)=>{
    console.log(req.body)
    const event = new userData({username: req.body.username, password: req.body.password});

    try{
        await event.save();
        console.log("User inserted");
    }catch(error){
        console.log(error);
    }
})


//routes for event registration data
app.post("/addEvent",async (req,res)=>{
    // console.log(req.body)
    const event = new eventRegData({event_code: req.body.event_code, userID: req.body.userID});

    try{
        await event.save();
        console.log("User inserted");
    }catch(error){
        console.log(error);
    }
})

app.post("/registeredEvents",async (req,res)=>{
    console.log(req.body)
    var registeredEvents = []
    eventRegData.find({userID: req.body.userID}, (err, result) => {
        if(err) res.send(err)
        result.forEach(element => {
            eventData.find({event_code: element.event_code}, (err, result) => {
                if(err) res.send(err)
                res.send(result)
                registeredEvents.push(result)
            })
        });
    })
    res.send(registeredEvents)
})


app.listen(3001, ()=>{
    console.log("Server running on port 3001...")
})