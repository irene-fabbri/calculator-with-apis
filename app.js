const express = require(`express`);
const cors = require(`cors`);

const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

app.post('/add', (req,res) => {
    // Check if body has a numbers section
    if(!req.body.numbers) {
        return res.status(400).send('Number list required');
    };

    if(!Array.isArray(req.body.numbers)) {
        return res.status(400).send('Number list must be an array');
    };

    // Check if number section has at least two items
    if(req.body.numbers.length < 2) {
        return res.status(400).send('Need at least two numbers in the list');
    };
    
    // If all are valid numbers, return the sum
    let sum = 0;
    for(let num of req.body.numbers){
        num = parseFloat(num);
        if(isNaN(num)){
            return res.status(400).send('Invalid number format');
        }
        sum += num
    }

    res.status(200);
    return res.json({
        operation: "sum",
        numbers: req.body.numbers,
        result: `${sum}`
    });

});