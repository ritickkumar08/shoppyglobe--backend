//Configure Express.
//middleware (json, cors)
// route mounting
// global error handler

import express from 'express'

const app = express()
app.use(express.json()) //a built-in middleware to convert the responses to json format to understand.

export default app