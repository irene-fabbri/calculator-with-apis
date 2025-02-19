const express = require(`express`);
const cors = require(`cors`);

const app = express ();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Content-Type": "application/vnd.api+json"); 
    if(! (req.get('Accept')==="application/vnd.api+json")){ 
        return res.status(415).send("Unsupported media type");
    };
    next();
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.post('/sum', (req,res) => {
    // Check if body has a numbers section
    if(!req.body.num1 || !req.body.num2) {
        return res.status(400).send('num1 and num2 required');
    };
    
    // Check if valid numbers
    let num1 = parseFloat(req.body.num1)
    let num2 = parseFloat(req.body.num2)

    if(isNaN(num1) || isNaN(num2)){
        return res.status(400).send('Invalid number format');
    }
    
    let sum = num1 + num2    

    res.status(200);
    return res.json({
        "operation": "sum",
        "num1": `${req.body.num1}`,
        "num2": `${req.body.num2}`,
        "result": `${sum}`
    });

});

