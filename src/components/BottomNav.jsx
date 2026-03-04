import "./BottomNav.css"

function BottomNav({ currentTab, setCurrentTab }) {
  return (
    <div className="bottom-nav">
      <button
        className={currentTab === "home" ? "active" : ""}
        onClick={() => setCurrentTab("home")}
      >
        Home
      </button>

      <button
        className={currentTab === "booking" ? "active" : ""}
        onClick={() => setCurrentTab("booking")}
      >
        Agendar
      </button>

      <button
        className={currentTab === "profile" ? "active" : ""}
        onClick={() => setCurrentTab("profile")}
      >
        Perfil
      </button>
    </div>
  )
}

export default BottomNav