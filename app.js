const express = require(`express`);
const cors = require(`cors`);
const PORT = process.env.PORT || 5000
const inputValidation = require('./input_validation')

const app = express ();

app.use(express.json({type: 'application/vnd.api+json'}));
app.use(express.urlencoded({ extended: true })); 
app.use(cors())

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

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).send({
      "errors": [
        {
          "status": "400",
          "code": "invalid-JSON",          
          "title": "invalid JSON",
          "detail": "The paylod MUST be valid JSON"
        }
      ]
    });
  }
  next(err); // Pass the error to the next middleware if it's not a syntax error
});


app.post('/sum', inputValidation, (req,res) => {

  const { data } = req.body;

    let num1 = parseFloat(data.attributes.num1)
    let num2 = parseFloat(data.attributes.num2)
    
    let sum = num1 + num2    

    res.status(200).json({
        "data": {
            "type": "operation", // Type of resource (can be anything, "operation" in this case)
            "id": "sum-operation", // Optional: Unique ID for this operation, you can generate a unique one
            "attributes": {
                "num1": `${num1}`,
                "num2": `${num2}`,
                "result": `${sum}`
            }
        }
    });

});

app.post('/sub', inputValidation, (req,res) => {
  // Extract and process the 'data' from the body
  const { data } = req.body;

  let num1 = parseFloat(data.attributes.num1)
  let num2 = parseFloat(data.attributes.num2)

  let substraction = num1 - num2    

  res.status(200).json({
      "data": {
          "type": "operation", // Type of resource (can be anything, "operation" in this case)
          "id": "substraction-operation", // Optional: Unique ID for this operation, you can generate a unique one
          "attributes": {
              "num1": `${num1}`,
              "num2": `${num2}`,
              "result": `${substraction}`
          }
      }
  });

});

app.post('/mult', inputValidation, (req,res) => {

  const { data } = req.body;

  let num1 = parseFloat(data.attributes.num1)
  let num2 = parseFloat(data.attributes.num2)
 
  let multiplication = num1 * num2    

  res.status(200).json({
      "data": {
          "type": "operation", // Type of resource (can be anything, "operation" in this case)
          "id": "multiplication-operation", // Optional: Unique ID for this operation, you can generate a unique one
          "attributes": {
              "num1": `${num1}`,
              "num2": `${num2}`,
              "result": `${multiplication}`
          }
      }
  });

});

app.post('/div', inputValidation, (req,res) => {

  const { data } = req.body;

  let num1 = parseFloat(data.attributes.num1)
  let num2 = parseFloat(data.attributes.num2)

  let division = num1 / num2    

  res.status(200).json({
      "data": {
          "type": "operation", // Type of resource (can be anything, "operation" in this case)
          "id": "division-operation", // Optional: Unique ID for this operation, you can generate a unique one
          "attributes": {
              "num1": `${num1}`,
              "num2": `${num2}`,
              "result": `${division}`
          }
      }
  });

});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});