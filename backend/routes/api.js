var pool =  require('../function/pgpool');
var express = require('express');
var router = express.Router();

router.get('/currency', async(req, res, next)=>{
  data = await getCurrencyList();
  data = data.map((item,i)=>({
    no:i+1,
    ...item
  }))
  console.log(JSON.stringify(data));
  res.send(data);
})
router.get('/delete-currency/:id', async(req, res, next)=>{
  data = await deleteCurrencyData(req.params.id);
  console.log(JSON.stringify(data));
  res.send(data);
})

router.get('/add-currency/:id', async(req, res, next)=>{
  data = await deleteCurrencyData(req.params.id);
  console.log(JSON.stringify(data));
  res.send(data);
})

router.get('/add-currency/:country/:value', async(req, res, next)=>{
  data = await addCurrencyData(req.params.country, parseInt(req.params.value));
  console.log(JSON.stringify(data));
  res.send(data);
})

router.get('/currency-chart/:currency', (req, res, next)=>{
  data = generateCurrencyChartData(parseInt(req.params.currency));
  console.log(JSON.stringify(data));
  res.send(data);
})



const getCurrencyList = async () =>{
  let response;
  try {
    response = await pool.query('select * FROM currency');
    return response.rows;
  } catch (error) {
    console.log(error);
  }
}

const deleteCurrencyData = async (id) =>{
  let response;
  try {
    let queryScript = `
      DELETE FROM currency WHERE id=${id}
    `
    response = await pool.query(queryScript);
    return {"rowCount":response.rowCount};
  } catch (error) {
    console.log(error);
  }
}

const addCurrencyData = async (country,currencyValue) =>{
  let response;
  try {
    let queryScript = `
      INSERT INTO public.currency
        (country, currency_value)
      VALUES('${country}', ${currencyValue});
    `
    response = await pool.query(queryScript);
    return {"rowCount":response.rowCount};
  } catch (error) {
    console.log(error);
  }
}

const generateCurrencyChartData = (currency) =>{
  let result = {};
  let xAxis = ["Mon", "Sun", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let yAxis = [];
  xAxis.forEach((data)=>{
    let num = 0.8*currency + 0.4*Math.random()*currency;
    yAxis.push(num);
  })
  result.xAxis=xAxis;
  result.yAxis=yAxis;
  return result;
}
module.exports = router; 
