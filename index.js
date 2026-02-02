//Start the application.
//it contains the database connection logic.
import express from 'express'

const app = express()
app.use(express.json()) //a built-in middleware to convert the responses to json format to understand.

const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`); //a response so that we know that the server is listening to the port
})