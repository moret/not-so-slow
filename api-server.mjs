import express from 'express'

const apiApp = express()

apiApp.get('/', (req, res) => {
  const start = performance.now()
  console.log(`[api-server] fast response! ⚡️`)
  res.send(`${(performance.now()) - start}ms`)
})

apiApp.listen(4352, () => {
  console.log('api-server at 4352')
})
