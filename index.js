const express = require("express")
var app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    res.send("<h1>Gabriel Monteiro - 010618012.</h1>")
})

require("./controllers/login")(app)

const middleware = require('./middleware/autenticar')
app.use(middleware)

// require("./controllers/usuarios")(app)
require("./controllers/produtos")(app)


app.use((req, res) => {
    res.send("Página não encontrada :c ")
})

app.listen(process.env.PORT || 80, () => {
    console.log("servidor online")
})

