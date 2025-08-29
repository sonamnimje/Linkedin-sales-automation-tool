import React, { useState } from 'react'

export default function ProfileAnalyzer({ campaign, onAnalyze }) {
	const [profileUrl, setProfileUrl] = useState('')
	const [result, setResult] = useState(null)

	function analyze(e) {
		e && e.preventDefault()
		if (!campaign) return alert('Create a campaign first')

		// Simulate extracting name and role from a LinkedIn URL or sample input
		const name = profileUrl.split('/').filter(Boolean).pop() || 'Anjali Mehta'
		const role = campaign.roles && campaign.roles.length ? campaign.roles[0] : 'HR Manager'

		const message = `Hi ${name.split('-').map(p=>p[0].toUpperCase()+p.slice(1)).join(' ')}, loved your recent post on ${campaign.triggers || 'hiring and HR trends'}. I work with startups helping ${role}s simplify onboarding with our AI tool (${campaign.product || 'AI HR Assistant'}). Thought it could be a great fit — open to a quick chat?`

		const analysis = {
			name,
			role,
			matchScore: Math.floor(Math.random() * 30) + 70,
			message
		}
		setResult(analysis)
		onAnalyze && onAnalyze(analysis)
	}

	return (
		<div className="card analyzer">
			<h3>Profile Analyzer</h3>
			<form onSubmit={analyze} className="inline">
				<input placeholder="Paste LinkedIn profile URL or @handle" value={profileUrl} onChange={e=>setProfileUrl(e.target.value)} />
				<button type="submit">Analyze</button>
			</form>
			<div className="hint">We simulate parsing the profile to craft a personalized opener.</div>

			{result && (
				<div className="result">
					<p><strong>Best match:</strong> {result.name} — {result.role}</p>
					<p><strong>Match score:</strong> {result.matchScore}%</p>
					<p><strong>Suggested message</strong></p>
					<div className="suggestion">{result.message}</div>
				</div>
			)}
		</div>
	)
}
