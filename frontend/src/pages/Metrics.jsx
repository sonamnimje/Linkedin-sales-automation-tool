import { useEffect, useState } from 'react'
import { fetchMetrics, triggerMockReply } from '../lib/api'

export default function Metrics() {
  const [metrics, setMetrics] = useState(null)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const data = await fetchMetrics()
      setMetrics(data)
    } catch (e) {
      setError(String(e))
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onMockReply = async () => {
    await triggerMockReply()
    await load()
  }

  return (
    <div>
      <h2>Metrics</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {metrics && (
        <ul>
          <li>Connections sent: {metrics.connections_sent}</li>
          <li>Follow-ups sent: {metrics.followups_sent}</li>
          <li>Replies received: {metrics.replies_received}</li>
        </ul>
      )}
      <button onClick={onMockReply}>Mock Reply</button>
    </div>
  )
}


