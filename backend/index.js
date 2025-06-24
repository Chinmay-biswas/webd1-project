// index.js
import express from 'express'
import dotenv from 'dotenv'
import cors  from 'cors'
import path  from 'path'
import { fileURLToPath } from 'url'

import { connectDB }     from './config/db.js'
import productRoutes     from './routes/product.route.js'

dotenv.config()

// ——— shim __dirname & __filename in ES modules ———
const __filename = fileURLToPath(import.meta.url)
const _dirname  = path.dirname(_filename)

// ——— express setup ———
const app = express()
connectDB()

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

// your API routes
app.use('/api/products', productRoutes)

if (process.env.NODE_ENV === 'production') {
  // point to Vite’s build output
  const clientDist = path.join(__dirname, 'client', 'dist')

  // serve static files
  app.use(express.static(clientDist))

  // anything that isn't /api -> index.html
  app.get('*', (req, res) => {
    // if the request starts with /api, skip back to the router
    if (req.path.startsWith('/api/')) return res.status(404).end()
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(🚀 Listening on http://localhost:${PORT})
})
