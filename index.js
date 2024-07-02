const express = require('express')
const AuthDynamicRouters = require("./routers/dynamicRoutes/authPages")
const GetAllProducts = require("./routers/appPages/GetMethod")
const con = require('./connection/sqlDB')
const cors = require('cors')
const app = express()
const port = 5000


// SQL DB CONECTION -------------------

con.connect((err) => {
    if (err) console.error('Error connecting to the database:', err.stack);

    console.log('SQL Database connected');
})

// MIDDLEWARE  -----------------------------
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// SERVER CONNECT ---------------------------

app.listen(port, () => {
    console.log(`Server Connected ${port}`)
})

// COMMON ROUTES -------------------------------

app.use('/', AuthDynamicRouters, GetAllProducts)