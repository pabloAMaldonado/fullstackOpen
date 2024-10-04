
import { useState, useEffect } from 'react'

const Notification =({ noti }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (noti) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [noti])

  if (!visible || !noti) {
    return null
  }
  return (
    <div className={`notification ${noti.status >= 200 && noti.status <= 206 ? 'success' : 'error'}`}>
      {noti.message}
    </div>
  )
}

const updNoti = (set, noti) => {
  set(noti)
  setTimeout(() => {
    set(null)
  }, 5000)
}

export default {
  Notification,
  updNoti
}
