import { useState, useEffect } from "react"
import Header from "./components/Header"
import Home from "./components/Home"
import Booking from "./components/Booking"
import Profile from "./components/Profile"
import BottomNav from "./components/BottomNav"
import "./App.css"

function App() {
  const [currentTab, setCurrentTab] = useState("home")
  const [appointments, setAppointments] = useState(() => {
  const saved = localStorage.getItem("appointments")
  return saved ? JSON.parse(saved) : []
})
useEffect(() => {
  localStorage.setItem("appointments", JSON.stringify(appointments))
}, [appointments])

  return (
    <div className="app">
      <div className="phone">
        <Header />

        <div className="content">
          {currentTab === "home" && (
            <Home goToBooking={() => setCurrentTab("booking")} />
          )}

          {currentTab === "booking" && (
            <Booking
              onConfirm={(newAppointment) => {
                setAppointments([...appointments, newAppointment])
                setCurrentTab("profile")
              }}
            />
          )}

          {currentTab === "profile" && (
            <Profile appointments={appointments} />
          )}
        </div>

        <BottomNav
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
      <h1 style={{color: 'red'}}>VERSÃO NOVA</h1>
    </div>
  )
}

export default App