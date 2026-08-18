const Notification = ({ message }) => {

  const notificationStyle = {
    color:'green',
    background:'lightgrey',
    fontSize:'25px',
    fontWeight:'bold',
    borderStyle:'solid',
    borderRadius:'10px',
    padding:'10px',
    marginBotton:'10px'

  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification