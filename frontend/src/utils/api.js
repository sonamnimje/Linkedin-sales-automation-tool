import axios from 'axios'

// Use Vite env for API base in production; fall back to localhost for dev.
// Configure Vercel/Render URL via VITE_API_BASE in environment.
const apiBaseFromEnv = import.meta.env?.VITE_API_BASE
const API_BASE = apiBaseFromEnv && apiBaseFromEnv.trim().length > 0
  ? apiBaseFromEnv
  : 'http://127.0.0.1:8000'
const client = axios.create({ baseURL: API_BASE, timeout: 10000 })

// Attach auth token if present
client.interceptors.request.use((config) => {
	const token = localStorage.getItem('auth_token')
	if (token) {
		config.headers = config.headers || {}
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export async function postCampaignIntake(payload) {
	const url = '/api/campaigns/intake'
	const { data } = await client.post(url, payload)
	return data
}

export async function startSequence(req) {
	const url = '/api/campaigns/sequence/start'
	const { data } = await client.post(url, req)
	return data
}

export async function fetchSequenceStats() {
	const url = '/api/campaigns/sequence/stats'
	const { data } = await client.get(url)
	return data
}

export async function fetchMetrics() {
	// Backend exposes metrics under /api/campaigns/metrics
	const url = '/api/campaigns/metrics'
	const { data } = await client.get(url)
	// Normalize backend keys to the shape the UI expects
	return {
		connections: data.connections_sent ?? data.connections ?? 0,
		followups: data.followups_sent ?? data.followups ?? 0,
		replies: data.replies_received ?? data.replies ?? 0,
	}
}

export async function triggerMockReply() {
	// Backend mock endpoint lives at /api/campaigns/metrics/mock-reply
	const url = '/api/campaigns/metrics/mock-reply'
	const { data } = await client.post(url)
	return data
}

export async function healthCheck() {
	const { data } = await client.get('/health')
	return data
}

// --- Auth ---
export async function signup({ email, password, name }) {
	const { data } = await client.post('/api/auth/signup', { email, password, name })
	if (data?.token) localStorage.setItem('auth_token', data.token)
	return data
}

export async function login({ email, password }) {
	const { data } = await client.post('/api/auth/login', { email, password })
	if (data?.token) localStorage.setItem('auth_token', data.token)
	return data
}

export async function me() {
	const { data } = await client.get('/api/auth/me')
	return data
}

export function logout() {
	localStorage.removeItem('auth_token')
}

export default {
	postCampaignIntake,
	startSequence,
	fetchSequenceStats,
	fetchMetrics,
	triggerMockReply,
	healthCheck,
	signup,
	login,
	me,
	logout,
}
