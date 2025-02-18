

const Notification = (notification) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification.notification === '') return null

  return (
    <div style={style}>
      {notification.notification}
    </div>
  )
}

export default Notification
