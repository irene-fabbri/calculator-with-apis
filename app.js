const express = require(`express`);
const cors = require(`cors`);
const PORT = process.env.PORT || 5000

const app = express ();
app.use(cors());

// Allow for POST method and application/vnd.api+json Content-Type and Accept field
app.use((req, res, next) => {
    if (['POST'].includes(req.method)) {
        // Check Content-Type
        if (req.get('Content-Type') !== 'application/vnd.api+json') {
            return res.status(415).send({
                "errors": [
                    {
                        "status": "415",
                        "code": "unsupported-media-type",     
                        "title": "Unsupported Media Type",
                        "detail": "Content-Type must be application/vnd.api+json"
                    }
                ]
            });
        }
        // Check Accept
        if (req.get('Accept') !== 'application/vnd.api+json') {
          return res.status(406).send({
              "errors": [
                  {
                      "status": "406",
                      "code": "not-acceptable",     
                      "title": "Not Acceptable",
                      "detail": "Accept header must be application/vnd.api+json"
                  }
              ]
          });
      }
    } else {
      return res.status(405).send({
        "errors": [
            {
                "status": "405",
                "code": "method-not-allowed",     
                "title": "Method not allowed",
                "detail": "Request metod MUST be POST"
            }
        ]
    });
  }
    next();
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

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
