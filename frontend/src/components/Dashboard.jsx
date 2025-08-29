import React, { useEffect, useState } from 'react'
import { fetchMetrics, triggerMockReply, startSequence, fetchSequenceStats } from '../utils/api'

export default function Dashboard({ campaign, analysis }) {
	const [metrics, setMetrics] = useState(null)
	const [loading, setLoading] = useState(false)
	const [seqStatus, setSeqStatus] = useState('')
	const [seqStats, setSeqStats] = useState(null)
	const [polling, setPolling] = useState(true)
	const [lastUpdated, setLastUpdated] = useState(null)

	useEffect(() => {
		loadMetrics()
	}, [])

	// Poll sequence stats periodically
	useEffect(() => {
		let timerId
		async function poll() {
			try {
				const data = await fetchSequenceStats()
				setSeqStats(data)
				setLastUpdated(new Date())
			} catch (err) {
				// best-effort; keep UI quiet
			}
		}
		if (polling) {
			poll()
			timerId = setInterval(poll, 5000)
		}
		return () => timerId && clearInterval(timerId)
	}, [polling])

	async function loadMetrics() {
		try {
			const data = await fetchMetrics()
			setMetrics(data)
		} catch (err) {
			console.warn('fetchMetrics failed', err?.message || err)
		}
	}

	async function onMockReply() {
		setLoading(true)
		try {
			await triggerMockReply()
			await loadMetrics()
		} catch (err) {
			console.warn(err)
		} finally {
			setLoading(false)
		}
	}

	async function onStartSequence() {
		if (!analysis) return setSeqStatus('No analysis available to start sequence')
		setSeqStatus('scheduling...')
		try {
			const req = {
				prospect: {
					name: analysis.name,
					title: analysis.role,
					company: 'unknown',
				},
				steps: [
					{ delay_minutes: 1, message: analysis.message },
					{ delay_minutes: 24 * 60, message: analysis.message + ' Following up.' },
				],
			}
			const res = await startSequence(req)
			setSeqStatus(JSON.stringify(res))
		} catch (err) {
			setSeqStatus(String(err))
		}
	}

	return (
		<div className="card dashboard">
			<h2>Campaign Dashboard</h2>
			{!campaign && <p className="muted">Create a campaign to see metrics here.</p>}

			{campaign && (
				<div>
					<h3>Campaign: {campaign.product_service || 'Untitled'}</h3>
					<p><strong>Industry:</strong> {campaign.target_industry || '—'}</p>
					<p><strong>Roles:</strong> {campaign.ideal_job_roles?.join(', ')}</p>
					<p><strong>Goal:</strong> {campaign.outreach_goal || '—'}</p>

					<hr />
					<h4>Live metrics</h4>

					{!metrics && (
						<div className="kpis">
							<div className="kpi skeleton"><div className="num">&nbsp;</div><div className="label">Connections</div></div>
							<div className="kpi skeleton"><div className="num">&nbsp;</div><div className="label">Follow-ups</div></div>
							<div className="kpi skeleton"><div className="num">&nbsp;</div><div className="label">Replies</div></div>
						</div>
					)}

					{metrics && (
						<div className="kpis">
							<div className="kpi">
								<div className="num">{metrics.connections || 0}</div>
								<div className="label">Connections</div>
							</div>
							<div className="kpi">
								<div className="num">{metrics.followups || 0}</div>
								<div className="label">Follow-ups</div>
							</div>
							<div className="kpi">
								<div className="num">{metrics.replies || 0}</div>
								<div className="label">Replies</div>
							</div>
						</div>
					)}

					<div style={{ marginTop: 8 }}>
						<button onClick={onMockReply} disabled={loading}>{loading ? 'Working...' : 'Trigger mock reply'}</button>
					</div>

					<div style={{ marginTop: 12 }}>
						<h4>Sequence</h4>
						<p className="muted">Start a simple 2-step outreach to the last analyzed prospect.</p>
						<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
							<button onClick={onStartSequence}>Start Sequence</button>
							<div style={{ color: '#9aa' }}>{seqStatus}</div>
							<button className="button secondary" onClick={() => setPolling(p => !p)}>
								{polling ? 'Pause' : 'Resume'} Stats
							</button>
							{polling && (
								<span className="muted" aria-label="loading" title="Polling...">⏳</span>
							)}
						</div>
						{seqStats && (
							<div className="muted" style={{ marginTop: 6 }}>
								Sequence status: {seqStats.messages_sent ?? 0} message(s) sent{lastUpdated ? ` • updated ${lastUpdated.toLocaleTimeString()}` : ''}
							</div>
						)}
					</div>

					{analysis && (
						<div style={{ marginTop: 12 }}>
							<h4>Last analysis</h4>
							<p>{analysis.name} — Score {analysis.matchScore}%</p>
							<div className="suggestion small">{analysis.message}</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
