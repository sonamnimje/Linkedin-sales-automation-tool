import { useEffect, useState } from 'react'
import { healthCheck } from '../lib/api'

export default function Home() {
  const [health, setHealth] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    healthCheck().then(setHealth).catch((e) => setError(String(e)))
  }, [])

  return (
    <div>
      <h2>Home</h2>
      {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <p>Use the navigation to explore features.</p>
    </div>
  )
}


