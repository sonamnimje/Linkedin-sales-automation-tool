import React, { useEffect, useState } from 'react'
import { healthCheck, me, logout } from './utils/api'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CampaignForm from './components/CampaignForm'
import Dashboard from './components/Dashboard'
import ProfileAnalyzer from './components/ProfileAnalyzer'

// Authentication routes removed; app loads directly

export default function App() {
	const [campaign, setCampaign] = useState(null)
	const [analysis, setAnalysis] = useState(null)
	const [health, setHealth] = useState('')
	const [theme, setTheme] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		let mounted = true
		healthCheck()
			.then((res) => {
				if (!mounted) return
				setHealth(res?.status || 'ok')
			})
			.catch(() => mounted && setHealth('offline'))
		me().then((u) => mounted && setUser(u)).catch(() => mounted && setUser(null))
		return () => { mounted = false }
	}, [])

	useEffect(() => {
		const saved = localStorage.getItem('theme')
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
		const next = saved || (prefersDark ? 'dark' : 'light')
		setTheme(next)
		document.documentElement.setAttribute('data-theme', next)
	}, [])

	useEffect(() => {
		if (!theme) return
		document.documentElement.setAttribute('data-theme', theme)
		localStorage.setItem('theme', theme)
	}, [theme])

	function toggleTheme() {
		setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
	}

	return (
		<BrowserRouter>
			<div className="app">
				<header className="app-header">
					<div className="header-actions">
						<nav className="nav">
							{user && (
								<>
									<span className="muted">{user.email}</span>
									<button onClick={() => { logout(); setUser(null) }}>Logout</button>
								</>
							)}
						</nav>
						<button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? '☾' : '☀'}</button>
					</div>
				</header>
				<Routes>
					<Route path="/" element={
						<main className="app-main">
							<section className="left">
								<CampaignForm onCreate={(c) => setCampaign(c)} />
								<ProfileAnalyzer campaign={campaign} onAnalyze={(a) => setAnalysis(a)} />
							</section>
							<aside className="right">
								<Dashboard campaign={campaign} analysis={analysis} />
							</aside>
						</main>
					} />
				</Routes>
				<footer className="app-footer">
					<div className="muted">Demo build • {new Date().getFullYear()}</div>
				</footer>
			</div>
		</BrowserRouter>
	)
}
