import { useEffect, useState } from 'react'
import EmptyState from '../components/ui/EmptyState'
import ResourceCard from '../components/resources/ResourceCard'
import { useAuth } from '../hooks/useAuth'
import { deleteResource, downloadResource, fetchBookmarks, toggleBookmark } from '../services/resourceService'

export default function BookmarksPage() {
  const { user } = useAuth()
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchBookmarks()
      .then((data) => {
        if (active) {
          setResources(data)
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.response?.data?.message || 'Unable to fetch bookmarks.')
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const [downloadingId, setDownloadingId] = useState(null)

  const handleBookmark = async (resourceId) => {
    await toggleBookmark(resourceId)
    setResources((current) => current.filter((resource) => resource.id !== resourceId))
  }

  const handleDelete = async (resourceId) => {
    await deleteResource(resourceId)
    setResources((current) => current.filter((resource) => resource.id !== resourceId))
  }

  const handleDownload = async (resourceId, fileName) => {
    setDownloadingId(resourceId)
    try {
      await downloadResource(resourceId, fileName)
    } catch (downloadError) {
      alert(downloadError.response?.data?.message || 'Download failed. The file might have been lost from ephemeral storage or is currently unavailable.')
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <div className="space-y-8">
      <section className="portal-page-hero rounded-[2.4rem] px-6 py-8">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-amber-700">Bookmarks</p>
        <h2 className="mt-3 font-display text-4xl text-slate-950 font-black">Your saved study collection.</h2>
        <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-800">
          Keep your most useful notes, assignments, and papers within quick reach.
        </p>
      </section>

      {loading ? <div className="grid gap-5 xl:grid-cols-2">{Array.from({ length: 2 }).map((_, index) => <div key={index} className="h-72 animate-pulse rounded-[2rem] bg-white/5" />)}</div> : null}
      {error ? <EmptyState title="Bookmarks unavailable" description={error} /> : null}
      {!loading && !error && !resources.length ? (
        <EmptyState title="No bookmarks yet" description="Save resources from the library to build your personal study shortlist." />
      ) : null}

      <section className="grid gap-5 xl:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            userRole={user.role}
            onBookmark={handleBookmark}
            onDelete={handleDelete}
            onDownload={handleDownload}
            isDownloading={downloadingId === resource.id}
          />
        ))}
      </section>
    </div>
  )
}
