const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Online'))

app.listen(port, () => console.log('Backend service listening on port ${port}'))
