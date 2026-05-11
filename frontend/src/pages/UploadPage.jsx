import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadResource } from '../services/resourceService'

const initialForm = {
  title: '',
  description: '',
  type: 'NOTES',
  subject: '',
  department: 'MCA',
  year: '1',
  semester: '1',
  file: null,
}

export default function UploadPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setFeedback({ type: '', message: '' })

    const payload = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, value)
    })

    try {
      await uploadResource(payload)
      setFeedback({ type: 'success', message: 'Resource uploaded successfully.' })
      setForm(initialForm)
      navigate('/resources')
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.response?.data?.message || 'Upload failed. Please verify the file and form values.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <section className="portal-page-hero rounded-[2.4rem] px-6 py-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-700">Staff Upload</p>
        <h2 className="mt-3 font-display text-4xl text-slate-950 font-black">Publish academic files with department-ready metadata.</h2>
        <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-800">
          Upload PDFs or Word documents so students can access subject-specific content from a clean, searchable library.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="portal-panel portal-3d grid gap-6 rounded-[2rem] p-6 xl:grid-cols-2">
        <label className="block xl:col-span-2">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-slate-700">Title</span>
          <input
            required
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            className="portal-form-field px-4 py-3"
            placeholder="Enter Name of File"
          />
        </label>

        <label className="block xl:col-span-2">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-slate-700">Description</span>
          <textarea
            required
            rows="5"
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            className="portal-form-field px-4 py-3"
            placeholder="Concise summary of what students will find in the file."
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-slate-700">Type</span>
          <select
            value={form.type}
            onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
            className="portal-form-field px-4 py-3"
          >
            <option value="NOTES">Notes</option>
            <option value="ASSIGNMENT">Assignment</option>
            <option value="QUESTION_PAPER">Question Paper</option>
            <option value="SYLLABUS">Syllabus</option>
            <option value="ANNOUNCEMENT">Announcement</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-slate-700">Subject</span>
          <input
            required
            value={form.subject}
            onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
            className="portal-form-field px-4 py-3"
            placeholder="Subject Name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-slate-700">Department</span>
          <select
            value={form.department}
            onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))}
            className="portal-form-field px-4 py-3"
          >
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-slate-700">Year</span>
            <input
              type="number"
              required
              min="1"
              max="5"
              value={form.year}
              onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))}
              className="portal-form-field px-4 py-3"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-slate-700">Semester</span>
            <input
              type="number"
              required
              min="1"
              max="10"
              value={form.semester}
              onChange={(event) => setForm((current) => ({ ...current, semester: event.target.value }))}
              className="portal-form-field px-4 py-3"
            />
          </label>
        </div>

        <label className="block xl:col-span-2">
          <span className="mb-2 block text-xs font-black uppercase tracking-[0.3em] text-slate-700">File</span>
          <input
            type="file"
            required
            accept=".pdf,.doc,.docx"
            onChange={(event) => setForm((current) => ({ ...current, file: event.target.files?.[0] || null }))}
            className="portal-form-field block w-full border-dashed px-4 py-5 text-sm text-slate-700 font-bold"
          />
        </label>

        {feedback.message ? (
          <div className={`xl:col-span-2 rounded-2xl px-4 py-3 text-sm font-bold ${feedback.type === 'success' ? 'border border-emerald-500/20 bg-emerald-50 text-emerald-700' : 'border border-rose-500/20 bg-rose-50 text-rose-700'}`}>
            {feedback.message}
          </div>
        ) : null}

        <div className="xl:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="portal-button-primary rounded-full px-6 py-3 font-semibold disabled:opacity-70"
          >
            {submitting ? 'Uploading...' : 'Upload Resource'}
          </button>
        </div>
      </form>
    </div>
  )
}
