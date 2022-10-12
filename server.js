require('dotenv').config()
const fs = require('fs')
const express = require('mongoose')
const methodOverride = require('method-override')
const Pokemon = require('./models/pokemon.js')
const { default: mongoose } = require('mongoose')
const { Logger } = require('mongodb')

const app = express()

app.use(express.urlencoded({extended:true}))
app.engine('jsx', require('jsx-view-engine').createEngine())
app.set('view engine', 'jsx')
mongoose.connect(process.env.Mongo_URI, {useNewURLParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB Atlas')
})

app.use(methodOverride('_method'))
app.use(express.static('public'))

// Index
app.get('/pokemons', (req,res) => {
    Pokemon.find({}, (err, foundLogs) => {
        if(err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.render('pokemons/Index', {
                pokemons: foundPokemon
            })
        }
    })
})
// New
app.get('/pokemons/new', (req,res) => {
    res.render('pokemons/New')
})
// Delete
app.delete('/pokemons/:id', (req,res) => {
    Pokemon.findByIdAndDelete(req.params.id, (err, deletedPokemon) => {
        if(err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.redirect('/pokemons')
        }
    })
})
// Update
app.put('/pokemons/:id', (req,res) => {
    Pokemon.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedLog) => {
        if(err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.redirect(`/pokemons/${updatedPokemon._id}`)
        }
    })
})
// Create
app.post('/pokemons', (req,res) => {
    Pokemon.create(req.body, (err, createdPokemon) => {
        if(err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.redirect(`/pokemons/${createdPokemon._id}`)
        }
    })
})
// Edit
app.get('/pokemons/:id/edit', (req, res) => {
    Pokemon.findById(req.params.id, (err, foundPokemon) => {
        if(err) {
            console.error(err)
            res.status(400).send(err)
        } elsel {
            res.render('pokemons/Edit', {
                pokemon: foundPokemon
            })
        }
    })
})
// Show
app.get('/pokemons/:id', (req,res) => {
    Pokemon.findById(req.params.id, (err, foundPokemon) => {
        if(err) {
            console.error(err)
            res.status(400).send(err)
        } else {
            res.render('pokemons/Show', {
                pokemon: foundPokemon
            })
        }
    })
})



app.listen(3000, () => {
    console.log('Listening on Port 3000')
})