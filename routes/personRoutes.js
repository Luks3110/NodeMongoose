const router = require('express').Router()
const Person = require('../models/Person')

//POST /person
router.post('/', async (req,res) => {
    const {name, salary, approved} = req.body
    if(!name){
        res.status(422).json({error: 'Nome é obrigatório'})
    }

    const person = {
        name,
        salary,
        approved
    }
    try {
        await Person.create(person)
        res.status(201).json({message: `Person created: Nome: ${person.name}, Salário: ${person.salary}, Aprovado: ${person.approved}`})
    } catch (error) {
        res.status(500).json({error: error})
        console.error(error)
    }
})

//GET ALL
router.get('/', async (req,res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error})
        console.error(error)
    }
})

//GET BY ID
router.get('/:id', async (req,res) => {
    const {id} = req.params
    try {
        const person = await Person.findById(id)
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
        console.error(error)
    }
})

//UPDATE Person
router.patch('/:id', async(req,res) => {
    const {id} = req.params
    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved
    }
    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)
        console.log(updatedPerson)
        if(updatedPerson.matchedCount === 0){
            res.status(422).json({error: 'Person not found'})
            return
        }
        res.status(200).json(person)   
    } catch (error) {
        res.status(500).json({error: error})
        console.error(error)
    }
})

//DELETE Person
router.delete('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const deletedPerson = await Person.deleteOne({_id: id})
        if(deletedPerson.deletedCount === 0){
            res.status(422).json({error: 'Person not found'})
            return
        }
        res.status(200).json({message: 'Person deleted'})
    } catch (error) {
        res.status(500).json({error: error})
        console.error(error)
    }
})

module.exports = router
