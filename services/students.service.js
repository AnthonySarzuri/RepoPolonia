const faker=require("faker")
const boom=require('@hapi/boom')
const pool = require("../libs/postgres_pull")

class StudentService{
    constructor(){
        this.students=[]
        this.generate()
    }
    async generate(){
        const limit=50
        for (let index = 0; index < limit; index++) {
        this.students.push({
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            age: parseInt(faker.random.number(99)),
            phone: faker.phone.phoneNumber(),
            image: faker.image.avatar()
        })
        
    }
    }
    async create(data){
        const newStudent={
            id:faker.datatype.uuid(),
            ...data
        }
        this.students.push(newStudent)
        return newStudent
    }
    async find() {
        const query='select * from public.estudiantes'
        const students=await pool.query(query)
        return students.rows
    }
    async findone(id){
        const student=this.students.find(item=>item.id===id)
        //const student=this.getall()//forzando un error
        if(!student){
            throw boom.notFound('Couldn`t find that student')
        }  
        return this.students.find(item=>item.id===id)
    }
    async update(id,changes){
        const index=this.students.findIndex(item=>item.id===id)
        if(index===-1){
            throw boom.notFound('couldn`t find that student')
        }
        const student=this.students[index]
         
        this.students[index]={
            ...student,
            ...changes
        }
         
        return this.students[index]
    }
    async delete(id){
        const index=this.students.findIndex(item=>item.id===id)
        if(index===-1){
            throw boom.notFound('Couldn`t find that student')
            //throw boom.forbidden('Couldn`t find that student') este es solo un ejemplo de como debemos especificar que tipo de error saldrá

        }  
        this.students.splice(index,1)
        return{
            message:'deleted',
            id
        }
    }
}


module.exports=StudentService
