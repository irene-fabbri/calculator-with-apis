const request = require('supertest');
const app = require('./app')

describe('Allowed Methods', () => {
    it('should allow for POST requests', async () => {
      const res = await request(app)
        .post('/sum')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        .send({
            "data": 
            { 
                "type": "sum-operation",
                "attributes": 
                {
                    "num1": "1",
                    "num2": "2"          
                }
            }
        });
      expect(res.statusCode).toEqual(200);
    });

    it('should NOT allow for GET requests', async () => {
        const res = await request(app)
          .get('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "1",
                      "num2": "2"          
                  }
              }
            });
        expect(res.statusCode).toEqual(405);
    });

    it('should NOT allow for PUT requests', async () => {
        const res = await request(app)
            .put('/sum')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
            .send({
                "data": 
                { 
                    "type": "sum-operation",
                    "attributes": 
                    {
                        "num1": "1",
                        "num2": "2"          
                    }
                }
            });
        expect(res.statusCode).toEqual(405);
    });

    it('should NOT allow for DELETE requests', async () => {
        const res = await request(app)
          .delete('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "1",
                      "num2": "2"          
                  }
              }
          });
        expect(res.statusCode).toEqual(405);
    });
});
  
describe('Request Headers', () => {
    it('should allow for requests with Content-Type and Accept headers set to "application/vnd.api+json"', async () => {
        const res = await request(app)
        .post('/sum')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        .send({
            "data": 
            { 
                "type": "sum-operation",
                "attributes": 
                {
                    "num1": "1",
                    "num2": "2"          
                }
            }
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should NOT allow for requests with Content-Type different from "application/vnd.api+json"', async () => {
        const res = await request(app)
            .post('/sum')
            .set('Accept', 'application/vnd.api+json')
            .send({
                "data": 
                { 
                    "type": "sum-operation",
                    "attributes": 
                    {
                        "num1": "1",
                        "num2": "2"          
                    }
                }
            });
        expect(res.statusCode).toEqual(415);
    });

    it('should NOT allow for requests with Accept field different from "application/vnd.api+json"', async () => {
        const res = await request(app)
            .post('/sum')
            .set('Content-Type', 'application/vnd.api+json')
            .set('Accept','*')
            .send({
                "data": 
                { 
                    "type": "sum-operation",
                    "attributes": 
                    {
                        "num1": "1",
                        "num2": "2"          
                    }
                }
            });
        expect(res.statusCode).toEqual(406);
    });
});

describe('Invalid JSON', () => {
    it('should give 400 for invalid JSON', async () => {
        const res = await request(app)
        .post('/sum')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        .send([1,2]);
        expect(res.statusCode).toEqual(400)
    });
});

describe('Missing path', () => {
    it('should give 404 for missing path', async () => {
      const res = await request(app)
        .post('/path')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        .send({
            "data": 
            { 
                "type": "sum-operation",
                "attributes": 
                {
                    "num1": "1",
                    "num2": "2"          
                }
            }
        });
      expect(res.statusCode).toEqual(404);
    });
});

describe('Input validation', () => {
    it('should give 200 for valid request', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "3"          
                  }
              }
          });
        expect(res.statusCode).toEqual(200);
    });

    it('should give 400 for missing body', async () => {
      const res = await request(app)
        .post('/sum')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
      expect(res.statusCode).toEqual(400);
    });

    it('should give 400 for missing body attributes', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
              }
          });
        expect(res.statusCode).toEqual(400);
    });

    it('should give 400 for missing num1', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "1": "1",
                      "num2": "2"          
                  }
              }
          });
        expect(res.statusCode).toEqual(400);
    });

    it('should give 400 for missing num2', async () => {
        const res = await request(app)
            .post('/sum')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
            .send({
                "data": 
                { 
                    "type": "sum-operation",
                    "attributes": 
                    {
                        "num1": "1",
                        "2": "2"          
                    }
                }
            });
        expect(res.statusCode).toEqual(400);
    });

    it('should give 400 for too many arguments', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "1",
                      "num2": "2",
                      "num3": "3"          
                  }
              }
            });
        expect(res.statusCode).toEqual(400);
      });

      it('should give 400 for non-numeric input', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "cinque",
                      "num2": "3"          
                  }
              }
            });
        expect(res.statusCode).toEqual(400);
    });

});
  
describe('Sum operation', () => {
    it('sum of positive integers', async () => {
      const res = await request(app)
        .post('/sum')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        .send({
            "data": 
            { 
                "type": "sum-operation",
                "attributes": 
                {
                    "num1": "5",
                    "num2": "2"          
                }
            }
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.attributes.result).toEqual("7");
    });

    it('sum of positive and negative integers', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "-2"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("3");
    });

    it('sum of finite number and Infinity', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("Infinity");
      });

    it('Infinity-Infinity', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "-Infinity",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("NaN");
      });

    it('-Infinity-Infinity', async () => {
        const res = await request(app)
          .post('/sum')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "sum-operation",
                  "attributes": 
                  {
                      "num1": "-Infinity",
                      "num2": "-Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("-Infinity");
      });
});

describe('Subsraction operation', () => {
    it('substraction of positive integers', async () => {
      const res = await request(app)
        .post('/sub')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        .send({
            "data": 
            { 
                "type": "substraction-operation",
                "attributes": 
                {
                    "num1": "5",
                    "num2": "2"          
                }
            }
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.attributes.result).toEqual("3");
    });

    it('sum of positive and negative integers', async () => {
        const res = await request(app)
          .post('/sub')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "substraction-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "-2"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("7");
    });

    it('substraction of finite number and Infinity', async () => {
        const res = await request(app)
          .post('/sub')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "substraction-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("-Infinity");
      });

    it('Infinity and -Infinity', async () => {
        const res = await request(app)
          .post('/sub')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "substraciton-operation",
                  "attributes": 
                  {
                      "num1": "-Infinity",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("-Infinity");
      });

    it('Infinity, Infinity', async () => {
        const res = await request(app)
          .post('/sub')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "substraction-operation",
                  "attributes": 
                  {
                      "num1": "Infinity",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("NaN");
      });
});

describe('Multiplication operation', () => {
    it('Multiplication of positive integers', async () => {
      const res = await request(app)
        .post('/mult')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        .send({
            "data": 
            { 
                "type": "multiplication-operation",
                "attributes": 
                {
                    "num1": "5",
                    "num2": "2"          
                }
            }
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.attributes.result).toEqual("10");
    });

    it('multiplication of positive and negative integers', async () => {
        const res = await request(app)
          .post('/mult')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "multiplication-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "-2"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("-10");
    });

    it('multiplication of integer and zero', async () => {
        const res = await request(app)
          .post('/mult')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "multiplication-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "0"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("0");
    });

    it('multiplication of zero and Infinity', async () => {
        const res = await request(app)
          .post('/mult')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "multiplication-operation",
                  "attributes": 
                  {
                      "num1": "0",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("NaN");
    });

    it('multiplication of non-zero finite number and Infinity', async () => {
        const res = await request(app)
          .post('/mult')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "multiplication-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("Infinity");
      });

    it('Infinity and -Infinity', async () => {
        const res = await request(app)
          .post('/mult')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "multiplication-operation",
                  "attributes": 
                  {
                      "num1": "-Infinity",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("-Infinity");
      });

    it('-Infinity and -Infinity', async () => {
        const res = await request(app)
          .post('/mult')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "mult-operation",
                  "attributes": 
                  {
                      "num1": "-Infinity",
                      "num2": "-Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("Infinity");
      });
});

describe('Division operation', () => {
    it('Division of positive integers', async () => {
      const res = await request(app)
        .post('/div')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        .send({
            "data": 
            { 
                "type": "division-operation",
                "attributes": 
                {
                    "num1": "18",
                    "num2": "2"          
                }
            }
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.attributes.result).toEqual("9");
    });

    it('division of positive and negative integers', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "division-operation",
                  "attributes": 
                  {
                      "num1": "15",
                      "num2": "-30"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("-0.5");
    });

    it('divisionion of zero and finite integer', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "division-operation",
                  "attributes": 
                  {
                      "num1": "0",
                      "num2": "5"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("0");
    });

    it('divisionion of finite integer and zero', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "division-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "0"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("Infinity");
    });

    it('divisionion of zero and zero', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "division-operation",
                  "attributes": 
                  {
                      "num1": "0",
                      "num2": "0"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("NaN");
    });

    it('division of zero and Infinity', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "division-operation",
                  "attributes": 
                  {
                      "num1": "0",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("0");
    });

    it('division of Infinity and zero', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "division-operation",
                  "attributes": 
                  {
                      "num1": "Infinity",
                      "num2": "0"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("Infinity");
    });

    it('division of non-zero finite number and Infinity', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "multiplication-operation",
                  "attributes": 
                  {
                      "num1": "5",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("0");
      });

    it('Infinity and -Infinity', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "multiplication-operation",
                  "attributes": 
                  {
                      "num1": "-Infinity",
                      "num2": "Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("NaN");
      });

    it('-Infinity and -Infinity', async () => {
        const res = await request(app)
          .post('/div')
          .set('Accept', 'application/vnd.api+json')
          .set('Content-Type', 'application/vnd.api+json')
          .send({
              "data": 
              { 
                  "type": "mult-operation",
                  "attributes": 
                  {
                      "num1": "-Infinity",
                      "num2": "-Infinity"          
                  }
              }
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.result).toEqual("NaN");
      });
});