import { useEffect, useState } from "react"

function Profile({ appointments }) {
  return (
    <div>
      <h2>Perfil</h2>

      {appointments.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        appointments.map((a, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <strong>{a.service.name}</strong>
            <p>{a.date} às {a.time}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Profile