import { useState, useEffect } from "react"
import { FaCut } from "react-icons/fa"
import "./App.css"

const horariosDisponiveis = [
  "06:00","06:30","07:00","07:30","08:00","08:30",
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
  "18:00","18:30","19:00","19:30","20:00","20:30",
  "21:00","21:30","22:00","22:30","23:00"
]

function App() {
  const [screen, setScreen] = useState("home")

  const [clientes, setClientes] = useState([])

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments")
    return saved ? JSON.parse(saved) : []
  })

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")

  // salvar local
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments))
  }, [appointments])

  // buscar clientes do Django
  useEffect(() => {
    fetch("http://127.0.0.1:8000/clientes")
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.log(err))
  }, [])

  const horariosFiltrados = horariosDisponiveis.filter(horario => {
    return !appointments.some(
      ag => ag.data === selectedDate && ag.horario === horario
    )
  })

  return (
    <div className="app">
      <div className="phone">

        {/* HOME */}
        {screen === "home" && (
          <div className="content">
            <h1>Salão Meneses</h1>

            <div className="scissor-container">
              <FaCut className="scissor" />
            </div>

            <button className="primary-btn" onClick={() => setScreen("services")}>
              👤 Cliente
            </button>

            <button className="secondary-btn" onClick={() => setScreen("login")}>
              🔐 Profissional
            </button>
          </div>
        )}

        {/* SERVIÇOS */}
        {screen === "services" && (
          <div className="content">
            <button className="back-btn" onClick={() => setScreen("home")}>
              ⬅ Voltar
            </button>

            <h2>Escolha um serviço</h2>

            <button className="card" onClick={() => setScreen("booking")}>
              Corte - R$ 30
            </button>

            <button className="card" onClick={() => setScreen("booking")}>
              Barba - R$ 20
            </button>

            <button className="card" onClick={() => setScreen("booking")}>
              Escova - R$ 50
            </button>

            <button className="card" onClick={() => setScreen("booking")}>
              Progressiva - R$ 80
            </button>
          </div>
        )}

        {/* AGENDAMENTO */}
        {screen === "booking" && (
          <div className="content">
            <button className="back-btn" onClick={() => setScreen("services")}>
              ⬅ Voltar
            </button>

            <h2>Agendamento</h2>

            <div className="form-box">
              <input
                placeholder="Nome"
                className="input"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <input
                placeholder="Telefone"
                className="input"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />

              <input
                type="date"
                className="input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <h3>Horários disponíveis</h3>

            {!selectedDate && <p>Escolha uma data primeiro</p>}

            <div className="grid">
              {selectedDate &&
                horariosFiltrados.map((h) => (
                  <button
                    key={h}
                    className={`card ${selectedTime === h ? "selected" : ""}`}
                    onClick={() => setSelectedTime(h)}
                  >
                    {h}
                  </button>
                ))}
            </div>

            <button
  className="primary-btn"
  onClick={async () => {
    if (!nome || !telefone || !selectedDate || !selectedTime) {
      alert("Preencha tudo!")
      return
    }

    const novo = {
      nome,
      telefone,
      data: selectedDate,
      horario: selectedTime
    }

    try {
      // 🔥 salva no Django
      await fetch("http://127.0.0.1:8000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: nome,
          telefone: telefone
        })
      })

      // 🔥 salva no frontend (mantém seu sistema funcionando)
      setAppointments([...appointments, novo])

      alert("Agendamento realizado com sucesso!")

      setNome("")
      setTelefone("")
      setSelectedDate("")
      setSelectedTime("")
      setScreen("home")

    } catch (erro) {
      console.error(erro)
      alert("Erro ao salvar no servidor")
    }
  }}
>
  Confirmar Agendamento
</button>
          </div>
        )}

        {/* LOGIN */}
        {screen === "login" && (
          <div className="content center">
            <button className="back-btn" onClick={() => setScreen("home")}>
              ⬅ Voltar
            </button>

            <h2>Login Profissional</h2>

            <div className="form-box">
              <input placeholder="Usuário" className="input" />
              <input placeholder="Senha" type="password" className="input" />
            </div>

            <button
              className="primary-btn"
              onClick={() => setScreen("painel")}
            >
              Entrar
            </button>
          </div>
        )}

        {/* PAINEL */}
        {screen === "painel" && (
          <div className="content">
            <button className="back-btn" onClick={() => setScreen("home")}>
              ⬅ Voltar
            </button>

            <h2>Agendamentos</h2>

            {appointments.length === 0 && <p>Nenhum agendamento</p>}

            {appointments.map((ag, index) => (
              <div key={index} className="card">
                <p><strong>{ag.nome}</strong></p>
                <p>{ag.telefone}</p>
                <p>{ag.data} - {ag.horario}</p>

                <button
                  className="secondary-btn"
                  onClick={() => {
                    const novaLista = appointments.filter((_, i) => i !== index)
                    setAppointments(novaLista)
                  }}
                >
                  ❌ Excluir
                </button>
              </div>
            ))}

            {/* 👇 CLIENTES DO DJANGO */}
            <h3>Clientes cadastrados (Banco)</h3>

            {clientes.length === 0 ? (
              <p>Nenhum cliente no banco</p>
            ) : (
              clientes.map(c => (
                <div key={c.id} className="card">
                  {c.nome} - {c.telefone}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default App