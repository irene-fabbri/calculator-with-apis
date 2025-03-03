module.exports = (req, res, next) => {
    const { data } = req.body;

    if(!data || !data.attributes || !data.attributes.num1 || !data.attributes.num2 || Object.entries(data.attributes).length > 2) {
        return res.status(400).send({
            "errors": [
              {
                "status": "400",
                "code": "invalid-parameters",          
                "title": "num1 and num2 required",
                "detail": "The body needs to contain the attributes num1 and num2"
              }
            ]
          });
    };
    // Check if valid numbers
    let num1 = parseFloat(data.attributes.num1);
    let num2 = parseFloat(data.attributes.num2);

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
    };

    next();
}