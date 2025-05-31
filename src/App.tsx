import { StrictMode, useEffect, useState } from 'react'
import './App.css'
import BigComponent500KB from './BigComponent500KB'
import { createRoot } from 'react-dom/client'

const time = Date.now()

function App({ preloader }: { preloader: Preloader }) {
  const [message, setMessage] = useState<string | null>('loading...')

  useEffect(() => {
    preloader.getLongLatencyAPI().then((message) => {
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

interface Preloader {
  getLongLatencyAPI: () => Promise<string>
}

export const renderApp = (preloader: Preloader) => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App preloader={preloader} />
    </StrictMode>,
  )
}
