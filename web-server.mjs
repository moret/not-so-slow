import express from 'express'
import fetch from 'node-fetch'

const webApp = express()

const slowSyncWork = 300

webApp.get('/', async (req, res) => {
  const startSyncWork = performance.now()
  while ((performance.now() - startSyncWork) < slowSyncWork) { /* no-op */ }
  const startFetch = performance.now()
  const response = await fetch('http://localhost:4352/')
  const endFetch = performance.now()
  const responseText = await response.text()
  const endProcessing = performance.now()
  console.log(
    `[web-server] async response apparently took ${endFetch - startFetch}ms, ` +
    `processing ${endProcessing - endFetch}ms, but upstream measured ` +
    responseText
  )
  res.send('thank you for reaching slow local sync and fast upstream async service 🐢')
})

webApp.listen(3456, () => {
  console.log('web-server at 3456')
})
