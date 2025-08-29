import { useState } from 'react'
import { submitCampaignIntake } from '../lib/api'

const initial = {
  product_service: '',
  target_industry: '',
  ideal_job_roles: '',
  company_size: '',
  region: '',
  outreach_goal: '',
  brand_voice: '',
  optional_triggers: '',
}

export default function Campaigns() {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const payload = {
        product_service: form.product_service,
        target_industry: form.target_industry,
        ideal_job_roles: form.ideal_job_roles
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        company_size: form.company_size,
        region: form.region,
        outreach_goal: form.outreach_goal,
        brand_voice: form.brand_voice,
        optional_triggers: form.optional_triggers
          ? form.optional_triggers
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : null,
      }
      const data = await submitCampaignIntake(payload)
      setResult(data)
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Campaign Intake</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
        <input name="product_service" placeholder="Product/Service" value={form.product_service} onChange={onChange} required />
        <input name="target_industry" placeholder="Target Industry" value={form.target_industry} onChange={onChange} required />
        <input name="ideal_job_roles" placeholder="Ideal Job Roles (comma separated)" value={form.ideal_job_roles} onChange={onChange} required />
        <input name="company_size" placeholder="Company Size" value={form.company_size} onChange={onChange} required />
        <input name="region" placeholder="Region" value={form.region} onChange={onChange} required />
        <input name="outreach_goal" placeholder="Outreach Goal" value={form.outreach_goal} onChange={onChange} required />
        <input name="brand_voice" placeholder="Brand Voice" value={form.brand_voice} onChange={onChange} required />
        <input name="optional_triggers" placeholder="Optional Triggers (comma separated)" value={form.optional_triggers} onChange={onChange} />
        <button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate Preview'}</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 16 }}>
          <h3>Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}


