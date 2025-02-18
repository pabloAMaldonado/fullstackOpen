
import React, { useState } from 'react'
import './styles/notification.css'
import { useEffect } from 'react'

const Message = ({ message, status }) => {
    if (message === null) return null
    if (status === 201 || status === 200) {
        return (
            <p className="success">{message}</p>
        )
    }

    if (status !== 201) {
        return (
            <p className="error">{message}</p>
        )
    }
}

const Notification = ({ message, status }) => {
    const [showComponent, setShowComponent] = useState(true)

    useEffect(() => {
        setShowComponent(true)

        const timer = setTimeout(() => {
            setShowComponent(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [message, status])

    return (
        <>
        {showComponent && <Message message={message} status={status} /> }
        </>
    )
}

export default Notification
