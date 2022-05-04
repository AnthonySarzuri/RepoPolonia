const express = require('express')
const faker = require('faker')

const router = express.Router()

router.get('/', (req, res) => {
    const teachers = []
    const { size } = req.query
    limit = size || 20
    for (let index = 0; index < limit; index++) {
        teachers.push({
            nameTeacher: faker.name.firstName(),
            ageTeacher: parseInt(faker.random.number(40)),
            phoneTeacher: faker.phone.phoneNumber(),
            imageTeacher: faker.image.avatar()
        })
    }
    console.log(teachers.length)
    res.status(200).json(teachers)
})
router.post('/', (req, res) => {
    const body = req.body
    res.status(201).json({
        message: 'created',
        data: body
    })
})

router.patch('/:id', (req, res) => {
    const { id } = req.params
    const body = req.body
    res.status(202).json({
        message: 'updated',
        id: id,
        data: body
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const message = 'the teacher ' + id + ' has deleted'
    res.status(202).json({
        message: message,
        data: 'data'
    })
})

module.exports = router