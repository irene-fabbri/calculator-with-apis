module.exports = (req, res, next) => {
    const { data } = req.body;

    if(!data) {
        return res.status(400).send({
            "errors": [
              {
                "status": "400",
                "code": "missing-attribute",          
                "title": "Missing Attribute",
                "detail": "The request is missing required attributes",
                "source" : {
                    "pointer": "/data"
                }
              }
            ]
          });
    } else if (!data.attributes){
        return res.status(400).send({
            "errors": [
              {
                "status": "400",
                "code": "missing-attribute",          
                "title": "Missing Attribute",
                "detail": "The request is missing required attributes",
                "source" : {
                    "pointer": "/data/attributes/"
                }
              }
            ]
          });
    } else if( !data.attributes.num1 ){
        return res.status(400).send({
            "errors": [
              {
                "status": "400",
                "code": "missing-attribute",          
                "title": "Missing Attribute",
                "detail": "The request is missing required attributes",
                "source" : {
                    "pointer": "/data/attributes/num1"
                }
              }
            ]
          });
    } else if( !data.attributes.num2 ){
        return res.status(400).send({
            "errors": [
              {
                "status": "400",
                "code": "missing-attribute",          
                "title": "Missing Attribute",
                "detail": "The request is missing required attributes",
                "source" : {
                    "pointer": "/data/attributes/num2"
                }
              }
            ]
          });
    } else if( Object.entries(data.attributes).length > 2){
        return res.status(400).send({
            "errors": [
              {
                "status": "400",
                "code": "too-many-attributes",          
                "title": "Too Many Attributes",
                "detail": "The request has too many attributes (needed two: num1 and num2",
                "source" : {
                    "pointer": "/data/attributes"
                }
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