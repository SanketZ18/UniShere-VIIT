import { Bell, Check, Clock, Info, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { fetchNotifications, fetchUnreadCount, markAllAsRead, markAsRead } from '../../services/notificationService'
import { formatDistanceToNow, isValid, parseISO } from 'date-fns'

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null)

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications()
      setNotifications(data || [])
      const unread = (data || []).filter(n => !n.isRead).length
      setUnreadCount(unread)
    } catch (error) {
      console.error('Failed to load notifications', error)
      setNotifications([])
    }
  }

  useEffect(() => {
    loadNotifications()
    const interval = setInterval(loadNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      loadNotifications()
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Failed to mark notification as read', error)
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead()
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error('Failed to mark all as read', error)
    }
  }

  const formatTime = (dateStr) => {
    try {
      const date = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr)
      if (!isValid(date)) return 'Just now'
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (e) {
      return 'Recent'
    }
  }

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const NotificationModal = (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto px-4 pb-12 pt-24 custom-scrollbar">
      {/* Backdrop - Click anywhere to close */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-500"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="portal-slit-enter relative z-[10000] w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white bg-[linear-gradient(180deg,#fffdfa_0%,#fff7eb_100%)] p-0 shadow-[0_40px_90px_rgba(15,23,42,0.3)]"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,#f59e0b_0%,#f97316_55%,#fb923c_100%)]" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-100/50 bg-white/40 px-8 py-7">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-amber-100 text-amber-700 shadow-[0_12px_30px_rgba(245,158,11,0.15)]">
              <Bell size={26} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-700">Institutional Feed</p>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Notifications</h3>
            </div>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-100 bg-white/80 text-amber-700 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-900"
          >
            <X size={24} />
          </button>
        </div>

        {/* List */}
        <div className="max-h-[50vh] overflow-y-auto px-4 py-4 custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-amber-50 text-amber-200">
                <Bell size={40} />
              </div>
              <h4 className="text-xl font-black text-slate-900">All caught up!</h4>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">No new updates available.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`group relative flex gap-5 rounded-[1.8rem] border p-5 transition-all duration-300 ${
                    !notification.isRead 
                      ? 'border-amber-100 bg-white shadow-[0_10px_30px_rgba(245,158,11,0.06)]' 
                      : 'border-transparent bg-slate-50/50 opacity-80 hover:bg-slate-50 hover:opacity-100'
                  }`}
                >
                  <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                    !notification.isRead ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <Info size={18} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`truncate text-base font-black ${
                        !notification.isRead ? 'text-slate-950' : 'text-slate-600'
                      }`}>
                        {notification.title}
                      </p>
                    </div>
                    <p className="mt-1.5 text-sm font-semibold leading-relaxed text-slate-700">
                      {notification.message}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Clock size={12} />
                        {formatTime(notification.createdAt)}
                      </div>
                      
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="rounded-xl bg-amber-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-700 transition hover:bg-amber-200"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-amber-100 bg-white/40 px-8 py-6">
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-800 transition hover:text-amber-700 disabled:opacity-30"
          >
            <Check size={16} strokeWidth={3} />
            Mark all as read
          </button>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">
            Self-cleans in 24h
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={handleToggle}
        className={`portal-button-secondary relative flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300 ${
          isOpen ? 'border-amber-200 bg-white text-amber-600 shadow-sm' : 'text-slate-800'
        }`}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 animate-pulse items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white ring-2 ring-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && createPortal(NotificationModal, document.body)}
    </>
  )
}
