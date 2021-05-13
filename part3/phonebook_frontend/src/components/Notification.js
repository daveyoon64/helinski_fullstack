
const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success" style={style}>
      {message}
    </div>
  )
}

export default Notification