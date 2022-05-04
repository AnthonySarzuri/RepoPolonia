const express = require('express')
const faker = require('faker')

const router = express.Router()

router.get('/', (req, res) => {
    const courses = []
    const { size } = req.query
    limit = size || 20
    for (let index = 0; index < limit; index++) {
        courses.push({
            nameCourse: faker.name.jobType(),
            ageTeacher: parseInt(faker.random.number(40)),
            phoneTeacher: faker.phone.phoneNumber(),
            imageTeacher: faker.image.avatar()
        })
    }
    console.log(courses.length)
    res.status(200).json(courses)
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
    const message = 'the course ' + id + ' has deleted'
    res.status(202).json({
        message: message,
        data: 'data'
    })
})

module.exports = router