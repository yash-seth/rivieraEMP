import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './Components/HomePage/HomePage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import Navbar from './Components/Navbar/Navbar';
import EventsHomePage from './Components/EventsHomePage/EventsHomePage';
import EventPage from './Components/EventPage/EventPage';

import './App.scss';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<>
              <Navbar />
              <HomePage />
            </>}/>
            <Route path="/register" element={<>
              <Navbar />
              <RegisterPage />
            </>}/>
            <Route path="/events" element={<>
              <Navbar />
              <EventsHomePage />
            </>}/>
            <Route path="/events/:eventId" element={<>
              <Navbar />
              <EventPage />
            </>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
