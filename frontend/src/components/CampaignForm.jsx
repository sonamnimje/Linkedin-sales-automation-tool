import React, { useState } from 'react'
import { postCampaignIntake } from '../utils/api'

const defaultState = {
	product_service: '',
	target_industry: '',
	ideal_job_roles: '',
	company_size: '',
	region: '',
	outreach_goal: '',
	brand_voice: 'friendly',
	optional_triggers: ''
}

export default function CampaignForm({ onCreate }) {
	const [form, setForm] = useState(defaultState)
	const [loading, setLoading] = useState(false)
	const [preview, setPreview] = useState(null)
	const [error, setError] = useState('')

	function update(e) {
		const { name, value } = e.target
		setForm((s) => ({ ...s, [name]: value }))
	}

	async function submit(e) {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			const payload = {
				product_service: form.product_service,
				target_industry: form.target_industry,
				ideal_job_roles: form.ideal_job_roles.split(',').map(s=>s.trim()).filter(Boolean),
				company_size: form.company_size,
				region: form.region,
				outreach_goal: form.outreach_goal,
				brand_voice: form.brand_voice,
				optional_triggers: form.optional_triggers ? form.optional_triggers.split(',').map(s=>s.trim()).filter(Boolean) : undefined,
			}

			const data = await postCampaignIntake(payload)
			setPreview(data)
			onCreate && onCreate({ ...payload })
		} catch (err) {
			console.error(err)
			setError(err?.message || String(err))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="card form">
			<h2>Create outreach campaign</h2>
			<form onSubmit={submit}>
				<div className="field-group">
					<label>Product/Service <span className="req">*</span>
						<input required name="product_service" value={form.product_service} onChange={update} placeholder="AI hiring assistant" />
						<div className="hint">What you are selling; used to personalize outreach.</div>
					</label>

					<label>Target Industry <span className="req">*</span>
						<input required name="target_industry" value={form.target_industry} onChange={update} placeholder="SaaS, EdTech" />
						<div className="hint">Primary industries for this campaign. Comma-separated.</div>
					</label>
				</div>

				<div className="field-group two-col">
					<label>Ideal Job Roles <span className="req">*</span>
						<input required name="ideal_job_roles" value={form.ideal_job_roles} onChange={update} placeholder="CTO, Head of HR" />
						<div className="hint">Comma-separated roles of your buyer persona.</div>
					</label>

					<label>Company Size
						<select name="company_size" value={form.company_size} onChange={update}>
							<option value="">Select</option>
							<option>Startup</option>
							<option>SME</option>
							<option>Enterprise</option>
						</select>
						<div className="hint">Optional. Helps tailor tone and examples.</div>
					</label>
				</div>

				<div className="field-group two-col">
					<label>Region/Location
						<input name="region" value={form.region} onChange={update} placeholder="India, US" />
						<div className="hint">Optional. Will localize wording when possible.</div>
					</label>

					<label>Outreach Goal <span className="req">*</span>
						<input required name="outreach_goal" value={form.outreach_goal} onChange={update} placeholder="Book a call" />
						<div className="hint">What success looks like (e.g., demo, call, reply).</div>
					</label>
				</div>

				<div className="field-group">
					<label>Brand voice
						<select name="brand_voice" value={form.brand_voice} onChange={update}>
							<option value="friendly">Friendly</option>
							<option value="formal">Formal</option>
							<option value="enthusiastic">Enthusiastic</option>
						</select>
					</label>

					<label>Optional triggers
						<input name="optional_triggers" value={form.optional_triggers} onChange={update} placeholder="job change, hiring" />
						<div className="hint">Signals to reference (news, funding, hiring).</div>
					</label>
				</div>

				<div className="actions">
					<button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate Preview'}</button>
				</div>
			</form>

			{error && <div className="error">{error}</div>}

			{preview && (
				<div style={{ marginTop: 12 }}>
					<h4>Preview</h4>
					<p><strong>Prospects found:</strong> {preview.prospects_found}</p>
					<p><strong>Best match:</strong> {preview.best_match.name} — {preview.best_match.title} @ {preview.best_match.company}</p>
					<p><strong>Suggested connection:</strong></p>
					<div className="suggestion">{preview.message.connection}</div>
					<p style={{ marginTop: 8 }}><strong>Suggested follow-up:</strong></p>
					<div className="suggestion small">{preview.message.follow_up}</div>
				</div>
			)}
		</div>
	)
}
