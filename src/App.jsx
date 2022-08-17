import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'

import HomePage from './Components/HomePage/HomePage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import Navbar from './Components/Navbar/Navbar';
import EventsHomePage from './Components/EventsHomePage/EventsHomePage';
import EventPage from './Components/EventPage/EventPage';

import './App.scss';

function App() {
  const [mode, setMode] = useState('participant')
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<>
              <Navbar />
              <HomePage setMode={setMode}/>
            </>}/>
            <Route path="/register" element={<>
              <Navbar />
              <RegisterPage />
            </>}/>
            <Route path="/events" element={<>
              <Navbar />
              <EventsHomePage mode={mode}/>
            </>}/>
            <Route path="/events/:eventId" element={<>
              <Navbar />
              <EventPage mode={mode}/>
            </>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
