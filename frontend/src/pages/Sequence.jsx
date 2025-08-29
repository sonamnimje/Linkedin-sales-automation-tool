import { useState } from 'react'
import { startSequence, fetchSequenceStats } from '../lib/api'

export default function Sequence() {
  const [prospect, setProspect] = useState({ name: '', title: '', company: '' })
  const [stepsText, setStepsText] = useState('5|Hey {name}, let\'s connect!\n1440|Following up on my note yesterday')
  const [status, setStatus] = useState('')
  const [stats, setStats] = useState(null)

  const parseSteps = () => {
    return stepsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [delayStr, message] = line.split('|')
        return { delay_minutes: parseFloat(delayStr), message }
      })
  }

  const onStart = async (e) => {
    e.preventDefault()
    setStatus('Scheduling...')
    try {
      const steps = parseSteps()
      await startSequence({ prospect, steps })
      setStatus('Scheduled')
    } catch (e) {
      setStatus(String(e))
    }
  }

  const onStats = async () => {
    const data = await fetchSequenceStats()
    setStats(data)
  }

  return (
    <div>
      <h2>Sequence</h2>
      <form onSubmit={onStart} style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
        <input placeholder="Name" value={prospect.name} onChange={(e) => setProspect({ ...prospect, name: e.target.value })} required />
        <input placeholder="Title" value={prospect.title} onChange={(e) => setProspect({ ...prospect, title: e.target.value })} required />
        <input placeholder="Company" value={prospect.company} onChange={(e) => setProspect({ ...prospect, company: e.target.value })} required />
        <textarea rows={4} value={stepsText} onChange={(e) => setStepsText(e.target.value)} />
        <button type="submit">Start Sequence</button>
      </form>
      <div style={{ marginTop: 12 }}>{status}</div>
      <button onClick={onStats} style={{ marginTop: 12 }}>Refresh Stats</button>
      {stats && <pre>{JSON.stringify(stats, null, 2)}</pre>}
    </div>
  )
}


