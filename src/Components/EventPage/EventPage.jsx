import React from 'react'
import { useParams, Link} from "react-router-dom"

import { events } from "../../dummy-data/dummyData.js"

import "./EventPage.scss"

function EventPage() {
  let { eventId } = useParams(); 
  return (
    <>
        <div className='eventPageContainer'>
            {events.map((event)=>{
                return event.id === eventId-1 ? 
                (<div className='eventContainer'>
                    <div id="eventIdName">{event.event_name}</div>
                    <div className='eventContent'>
                        <div className='eventTimeDetails'>
                            <div id="eventIdStartTime">Start Time: {event.event_start_timestamp}</div>
                            <div id="eventIdEndTime">End Time: {event.event_end_timestamp}</div>
                        </div>
                        <div id="eventIdCapacity">Capacity Left: {event.event_capacity}</div>
                    </div>
                    <div className='eventIdControls'>
                        <Link to="/events" style={{textDecoration: "none", color: "inherit"}}><button id="redirectEvents">Go Back</button></Link>
                        <button id="register">Register</button>
                    </div>
                </div>
                )
                :
                (<span></span>)
            })}
        </div>
    </>
  )
}

export default EventPage