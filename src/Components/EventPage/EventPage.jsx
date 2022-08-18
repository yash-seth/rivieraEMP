import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { useParams, Link} from "react-router-dom"

// import { events } from "../../dummy-data/dummyData.js"

import "./EventPage.scss"

function EventPage({ mode, currentUser, setCurrentUser }) {
    const { eventId } = useParams(); 
    const [formView, setFormView] = useState(false)
    const [name, setName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState({lat: "0", lon: "0"});
    const [capacity, setCapacity] = useState(0);
    const [event, setEvent] = useState({
        event_name: " ",
        event_start_timestamp: " ",
        event_end_timestamp: " ",
        event_capacity: 0,
    })

    const addUserRegistration = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/addEvent", {event_code: eventId, userID: currentUser,
        }).then(response => {
          console.log(response)
        });
        };

    const updateEvent = (e) => {
        Axios.patch(`http://localhost:3001/events/${eventId}`, {event_code: eventId,
        event_name: name,
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

    const updateEventRegister = (e) => {
        Axios.patch(`http://localhost:3001/events/${eventId}`, {event_code: eventId,
        event_capacity: event.event_capacity - 1
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
        Axios.get(`http://localhost:3001/events/${eventId}`).then((response)=>{
            setEvent(response.data[0])
        })
    })
  return (
    <>
        <div className='eventPageContainer'>
        <div className='eventContainer'>
                    <div id="eventIdCOde">Event Code: {event.event_code}</div>
                    <div id="eventIdName">Event Name: {event.event_name}</div>
                    <div className='eventContent'>
                        <div className='eventTimeDetails'>
                            <div id="eventIdStartTime">Start Time: {event.event_start_timestamp}</div>
                            <div id="eventIdEndTime">End Time: {event.event_end_timestamp}</div>
                        </div>
                        <div id="eventIdCapacity">Capacity Left: {event.event_capacity}</div>
                    </div>
                    <div className='eventIdControls'>
                        <Link to="/events" style={{textDecoration: "none", color: "inherit"}}><button id="redirectEvents">Go Back</button></Link>
                        {mode === "participant" ? <Link to="/events" style={{textDecoration: "none", color: "inherit"}}><button id="register" onClick={(e)=>{updateEventRegister(true);addUserRegistration(e)}}>Register</button></Link> : <button id="register" onClick={()=>setFormView(true)}>Update Event Details</button>}
                    </div>
                </div>
                {formView && <div className='eventForm'>
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
                    <button type="submit" onClick={(e)=>{setFormView(false); updateEvent(e)}} id="eventFormSubmit">Submit</button>
                </div>}
        </div>
    </>
  )
}

export default EventPage