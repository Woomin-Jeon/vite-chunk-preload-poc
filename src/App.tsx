import { useEffect, useState } from 'react'
import './App.css'
import BigComponent500KB from './BigComponent500KB'

const time = Date.now()

function App() {
  const [message, setMessage] = useState<string | null>('loading...')

  useEffect(() => {
    window.PRELOAD_JS.getLongLatencyAPI().then((message) => {
      setMessage(`${message} - ${Date.now() - time}ms`)
    })
  }, [])

  return (
    <div>
      <div>{message}</div>
      <BigComponent500KB />
    </div>
  )
}

export default App
