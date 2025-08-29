import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/campaigns">Campaigns</Link>
        <Link to="/sequence">Sequence</Link>
        <Link to="/metrics">Metrics</Link>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default App
