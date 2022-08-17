const express = require('express');
const mongoose = require('mongoose')
const app = express();

const eventData = require("./models/rivieraEvents");

app.use(express.json());

mongoose.connect('mongodb+srv://yash_seth:easytoremember@cluster0.egbzd.mongodb.net/riviera?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

app.get("/",async (req,res)=>{
    const event = new eventData({event_name: "Nukad Natak", event_start_timestamp: "9pm", event_end_timestamp: "12pm", event_location: {lat: "78", lon: "45"}, event_capacity: 60});

    try{
        console.log("I was here")
        await event.save();
        console.log("Entry inserted");
    }catch(error){
        console.log(error);
    }
})

app.listen(3001, ()=>{
    console.log("Server running on port 3001...")
})