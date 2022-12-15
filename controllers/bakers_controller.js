// dependencies
const express = require('express')
const breads = require('./breads_controller.js')
const bakerSeedData = require('../models/baker_seed.js')
const Baker = require('../models/baker.js')
const baker = express.Router()

// index route
baker.get('/', (req, res) => {
    Baker.find()
    .populate('breads')
    .then(foundBakers => {
        res.send(foundBakers)
    })
})
   
//seed routes
baker.get('/data/seed', (req, res) =>{
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
    })

//delete route
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id)
    .then(deletedBaker =>{
        res.status(303).redirect('/breads')
    })
})

// Show: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate({
            path: 'breads',
            options: { limit: 2 }
        })
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})



// export
module.exports = baker                    

