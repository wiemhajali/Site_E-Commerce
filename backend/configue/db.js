const mongoose = require('mongoose') // import mongoose

const mongodb_uri = "mongodb+srv://wiem:<psw>@cluster0.tsblp8w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" //lien du serveur
const mongodb_options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

// connexion
mongoose.connect(mongodb_uri, mongodb_options)
    .then(() => console.log("we're connected to database !"))
    .catch(() => console.log("connection error!")) // connexion avec BD

    // export
module.exports = mongoose // export pour puisse le faire import dans index .js


