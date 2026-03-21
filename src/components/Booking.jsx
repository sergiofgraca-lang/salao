import { useState } from "react"
import { services } from "../data/services"

function Booking({ onConfirm }) {
  const [selectedService, setSelectedService] = useState(null)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const handleConfirm = () => {
    if (!selectedService || !date || !time) return
    onConfirm({
      service: selectedService,
      date,
      time
    })
  }

  return (
    <div>
      <h2>Escolha o serviço</h2>

      {services.map(service => (
        <div
          key={service.id}
          onClick={() => setSelectedService(service)}
          style={{
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "15px",
            background: selectedService?.id === service.id ? "#1d1b1b" : "#ccda10",
            cursor: "pointer"
          }}
        >
          <strong>{service.name}</strong>
          <p>R$ {service.price}</p>
        </div>
      ))}

      <h3>Escolha a data</h3>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <h3>Escolha o horário</h3>
      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={handleConfirm}
      >
        Confirmar
      </button>
    </div>
  )
}

export default Booking