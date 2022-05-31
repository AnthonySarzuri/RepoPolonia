const { Pool } = require('pg/lib')
const { config } = require('../config/config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD= encodeURIComponent(config.dbPassword)
const URI= 'postgres://${USER}:${PASSWORD}@${confing.dbHost}:${config.dbPort}/${config.dbName}'

const pool=new Pool({
   
        host: '172.18.0.3',
        port: 5432,
        user: root,
        password: admin123,
        database: my_db
    
})

module.exports = pool