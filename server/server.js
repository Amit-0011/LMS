// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
// import educatorRouter from './routes/educatorRoutes.js'
// import { clerkMiddleware } from '@clerk/express'
// import connectCloudinary from './config/cloudinary.js'
// import courseRouter from './routes/courseRoute.js'
// import userRouter from './routes/userRoutes.js'

// // Initialize Express
// const app = express()

// // Connect to database
// await connectDB()
// await connectCloudinary()

// // Middleware
// app.use(cors())
// app.use(clerkMiddleware())

// // Routes
// app.get('/', (req, res) => res.send("API Working"))
// app.post('/clerk', express.json(), clerkWebhooks)
// app.use('/api/educator', express.json(), educatorRouter)
// app.use('/api/course', express.json(), courseRouter)
// app.use('/api/user', express.json(), userRouter)
// app.post('/stripe', express.raw({type: 'application/json' }), stripeWebhooks )


// // Port
// const PORT = process.env.PORT || 5000

// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`)
// })





// debuged
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './config/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'

// Initialize Express
const app = express()

// Connect to database and cloudinary
await connectDB()
await connectCloudinary()

// Middleware
app.use(cors())

// IMPORTANT: Raw body parsing for webhooks BEFORE clerkMiddleware
app.use('/stripe', express.raw({type: 'application/json'}))
app.use('/clerk', express.raw({type: 'application/json'}))

// Apply clerk middleware to all routes except webhooks
app.use((req, res, next) => {
  if (req.path === '/stripe' || req.path === '/clerk') {
    return next()
  }
  clerkMiddleware()(req, res, next)
})

// Apply JSON parsing to non-webhook routes
app.use((req, res, next) => {
  if (req.path === '/stripe' || req.path === '/clerk') {
    return next()
  }
  express.json()(req, res, next)
})

// Routes
app.get('/', (req, res) => res.send("API Working"))

// Import webhook handlers here to avoid circular imports
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'

// Webhook routes (must be BEFORE other routes)
app.post('/clerk', clerkWebhooks)
app.post('/stripe', stripeWebhooks)

// API routes
app.use('/api/educator', educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)

// Export for Vercel
export default app

// Port for local development
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}