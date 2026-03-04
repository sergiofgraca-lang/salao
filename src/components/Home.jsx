function Home({ goToBooking }) {
  return (
    <div>
      <h2>Bem-vindo</h2>
      <p>Experiência premium em beleza e estilo.</p>

      <div className="card">
        <h3>Oferta Exclusiva</h3>
        <p>Corte + Barba com 20% OFF</p>
      </div>

      <button className="primary-btn" onClick={goToBooking}>
        Agendar Agora
      </button>
    </div>
  )
}

export default Home