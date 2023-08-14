const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodelinx_TR_DB',
  password: 'postgres',
  port: 5454,
})

module.exports = pool;