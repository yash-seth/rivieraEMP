import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Axios from 'axios'

// import { events } from "../../dummy-data/dummyData.js"

import "./EventsHomePage.scss"

function EventsHomePage({ mode, setCurrentUser, currentUser }) {
    const [events, setEvents] = useState([])
    const [formView, setFormView] = useState(false)
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState({lat: "0", lon: "0"});
    const [capacity, setCapacity] = useState(0);


    const addEvent = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/events", {event_code: code,event_name: name,
        event_start_time: startTime, 
        event_end_time: endTime,
        event_location: location,
        event_capacity: capacity
        });
        setName("");
        setStartTime("");
        setEndTime("");
        setLocation({lat:"", lon: ""});
        setCapacity(0);
    };

    const handleLocationLat = (latitude) => {
        setLocation(current => {
            let lat = {...current.lat};
      
            lat = latitude;
      
            return {...current, lat};
          });
    }
    const handleLocationLon = (longitude) => {
        setLocation(current => {
            let lon = {...current.lon};
      
            lon = longitude;
      
            return {...current, lon};
          });
    }

    useEffect(()=>{
        Axios.get('http://localhost:3001/events').then((response)=>{
            // console.log(response)
            setEvents(response.data.reverse())
        })
    })

    const deleteEvent = (eventID) => {
        Axios.delete(`http://localhost:3001/events/${eventID}`)
    }
  return (<>
  <div className='eventsHomePageContainer'>
    <div id="eventsHomePageContainerHeader">Events</div>
    <div className='events'>
        {events.map((event)=>{
            return (<>
                        <div className='eventDetails' key={event.event_code}>
                            Event Code:{event.event_code}
                            <div id='eventName'>Name: {event.event_name}</div>
                            <div id='eventStartTime'>Start Time: {event.event_start_timestamp}</div>
                            <div id='eventEndTime'>End Time: {event.event_end_timestamp}</div>
                            <div id='eventCapacity'>Capacity: {event.event_capacity}</div>
                            {mode === "participant" ? <Link to={`/events/${event.event_code}`} style={{textDecoration:"none", color: "inherit"}}><button id="registerEvent">Register</button></Link> : <Link to={`/events/${event.event_code}`} style={{textDecoration:"none", color: "inherit"}}><button id="registerEvent">View Event</button></Link>}
                            {mode === "admin" && <button id="deleteEvent" onClick={()=>deleteEvent(event.event_code)}><img id="crossBtn" src={require("../../Assets/images/Cross button.png")} alt="cross btn"/></button>}
                        </div>
                </>)
        })}
    </div>
    <div className='eventsHomePageControls'>
        <Link to="/register" style={{textDecoration: "none", color: "inherit"}}><button id="redirectEvents" onClick={() => setCurrentUser(null)}>Log Out</button></Link>
        {mode === "participant" &&<Link to={`/events/`} style={{textDecoration: "none", color: "inherit"}}><button id="registeredEvents">View Registered Events</button></Link>}
        {mode === "admin" && <button id="createEvent" onClick={()=>setFormView(true)}>Create Event</button>}
    </div>
    {formView && <div className='eventForm'>
            <label for="formEventName">Event Code: </label>
            <input type="text" name="formEventCode" onChange={(e)=>setCode(e.target.value)}/>
            <label for="formEventName">Event Name: </label>
            <input type="text" name="formEventName" onChange={(e)=>setName(e.target.value)}/>
            <label for="formStartTime">Event Start Time: </label>
            <input type="time" name="formStartTime" onChange={(e)=>setStartTime(e.target.value)}/>
            <label for="formEndTime">Event End Time: </label>
            <input type="time" name="formEndTime" onChange={(e)=>setEndTime(e.target.value)}/>
            <label for="formEventLat">Event Location Latitude: </label>
            <input type="text" name="formEventLat" onChange={(e)=>handleLocationLat(e.target.value)}/>
            <label for="formEventLon">Event Location Longitude: </label>
            <input type="text" name="formEventLon" onChange={(e)=>handleLocationLon(e.target.value)}/>
            <label for="formEventCapacity">Number of Seats: </label>
            <input type="text" name="formEventCapacity" onChange={(e)=>setCapacity(e.target.value)}/>
            <button type="submit" onClick={(e)=>{setFormView(false); addEvent(e)}} id="eventFormSubmit">Submit</button>
        </div>}
    </div>
    </>
  )
}

export default EventsHomePage