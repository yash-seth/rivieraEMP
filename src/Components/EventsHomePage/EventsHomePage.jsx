import React from 'react'
import { Link } from "react-router-dom"

import { events } from "../../dummy-data/dummyData.js"

import "./EventsHomePage.scss"

function EventsHomePage() {
  return (<>
  <div className='eventsHomePageContainer'>
    <div id="eventsHomePageContainerHeader">Events</div>
    <div className='events'>
        {events.map((event)=>{
            return (<>
                        <div className='eventDetails' key={event.id}>
                            {event.id+1}.
                            <div id='eventName'>{event.event_name}</div>
                            <div id='eventStartTime'>{event.event_start_timestamp}</div>
                            <div id='eventEndTime'>{event.event_end_timestamp}</div>
                            <div id='eventCapacity'>{event.event_capacity}</div>
                            <Link to={`/events/${event.id+1}`} style={{textDecoration:"none", color: "inherit"}}><button id="registerEvent">Register</button></Link>
                        </div>
                </>)
        })}
    </div>
    <div className='eventsHomePageControls'>
        <Link to="/register" style={{textDecoration: "none", color: "inherit"}}><button id="redirectEvents">Go Back</button></Link>
        <Link to={`/events/`} style={{textDecoration: "none", color: "inherit"}}><button id="registeredEvents">View Registered Events</button></Link>
    </div>
    </div>
    </>
  )
}

export default EventsHomePage