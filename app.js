const express = require(`express`);
const cors = require(`cors`);

const app = express ();
app.use(express.json());

// Check that the Content-Type is correct for POST/PUT/PATCH requests
app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        if (req.get('Content-Type') !== 'application/vnd.api+json') {
            return res.status(415).send({
                "errors": [
                    {
                        "status": "400",
                        "code": "unsupported-media-type",                  
                        "title": "Unsupported Media Type",
                        "detail": "Content-Type must be application/vnd.api+json"
                    }
                ]
            });
        }
    }
    next();
});

app.use((req, res, next) => {
    res.set('Content-Type', 'application/vnd.api+json');
    if( req.get('Accept') !=="application/vnd.api+json"){ 
        return res.status(415).send({
            "errors": [
              {
                "title": "Unsupported media type",
                "detail": "The media type of the request is not supported."
              }
            ]
          });
    };
    next();
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.post('/sum', (req,res) => {
    // Check if body has a numbers section
    console.log(req.body);
    if(!req.body.data || !req.body.data.num1 || !req.body.data.num2) {
        return res.status(400).send({
            "errors": [
              {
                "status": "400",
                "code": "invalid-parameters",          
                "title": "num1 and num2 required",
                "detail": "The body needs to contain the paramenters num1 and num2"
              }
            ]
          });
    };
    
    // Check if valid numbers
    let num1 = parseFloat(req.body.data.num1)
    let num2 = parseFloat(req.body.data.num2)

    if(isNaN(num1) || isNaN(num2)){
        return res.status(400).send({
            "errors": [
              {
                "status": "400",
                "code": "invalid-number-format",          
                "title": "Invalid number format",
                "detail": "The numbers provided are not in a valid format."
              }
            ]
          });
    }
    
    let sum = num1 + num2    

    res.status(200).json({
        "data": {
            "type": "operation", // Type of resource (can be anything, "operation" in this case)
            "id": "sum-operation", // Optional: Unique ID for this operation, you can generate a unique one
            "attributes": {
                "num1": `${req.body.num1}`,
                "num2": `${req.body.num2}`,
                "result": `${sum}`
            }
        }
    });

});

