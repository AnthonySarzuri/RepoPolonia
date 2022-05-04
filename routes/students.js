const express = require('express')

const StudentsService = require('../services/students.service')
const validateHandler=require('../middlewares/validate.handler')
const {createStudentSchema, updateStudentSchema, getStudentSchema}=require('../schemas/students.schema')

const router = express.Router()
const service = new StudentsService()

router.get('/', async (req, res) => {
    try{
        const students = await service.find()
        
        res.status(200).json(students)
    }catch(error){
        next(error)
    }
})
router.get('/:id', async (req, res,next) => {
    try{
        const id = req.params.id
        const student = await service.findone(id)
          
        res.status(200).json(student)
    }catch(error){
        next(error)
    }
})
router.post('/',
validateHandler(createStudentSchema,'body'),
async (req, res,next) => {
    try{
        const body = req.body
        const newStudent = await service.create(body)
        res.status(201).json({
            message: 'created',
            data: newStudent
        })
    }catch(error){
        next(error)
    }

})
router.patch('/:id',
validateHandler(getStudentSchema,'params'),
validateHandler(updateStudentSchema,'body'),
async (req, res,next) => {
    try{
        const { id } = req.params
        const body = req.body
        const changeStudent = await service.update(id, body)
        res.status(202).json({
            message: 'updated',
            data: changeStudent
        })
    }catch(error){
        next(error)
    }

})

router.delete('/:id',async (req, res,next) => {
    try{
        const { id } = req.params
        const studenDeleted=await service.delete(id)
        res.json(studenDeleted)
    }catch(error){
        next(error)
    }  
})

module.exports = router