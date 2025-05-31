import { useEffect, useState } from 'react'
import './App.css'
import BigComponent500KB from './BigComponent500KB'
import { promise } from './preload'

const time = Date.now()

function App() {
  const [message, setMessage] = useState<string | null>('loading...')

  useEffect(() => {
    promise.then((message) => {
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
