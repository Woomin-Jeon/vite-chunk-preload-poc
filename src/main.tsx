const promise = import('./preload').then(module => module.promise)

const preloader = {
  getLongLatencyAPI: () => promise
}

import('./App').then(module => {
  module.renderApp(preloader)
})
