import { getLongLatencyAPI } from './api'

declare global {
  interface Window {
    PRELOAD_JS: {
      getLongLatencyAPI: () => Promise<string>
    }
  }
}

const promise = getLongLatencyAPI()

window.PRELOAD_JS = {
  getLongLatencyAPI: () => promise,
}
