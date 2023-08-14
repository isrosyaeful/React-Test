var pool = require("./pgpool.js");

const getCurrency = async () => {
  pool.query("SELECT * FROM currency ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(JSON.stringify(results.rows))
    response.status(200).json(results.rows);
  });
};
