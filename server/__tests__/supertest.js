const request = require("supertest");
const server = "http://localhost:3000";


describe('Backend connectivity Test', () => {

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => request(server)
        .get('/')
        .expect('Content-Type',  /text\/html/)
        .expect(200));
    });
  });

  describe('/recipes/find', () => {
    //test for correct type, and correct returned value 
    describe('GET', () => {
      it('real combination should responds with 200 status and json content type', () => request(server)
        .get('/recipes/find')
        .send({ cuisine: "British", ingredients: "butter"})
        .expect('Content-Type',  /application\/json/)
        .expect(200)
      )
    });

    describe('GET', () => {
      it('Query with valid cuisine and invalid ingredient should fail and return 404', () => request(server)
        .get('/recipes/find')
        .send({ cuisine: "British", ingredients: "kim"})
        .expect('Content-Type',  /text\/html/)
        .expect(404)
      )
    });

    describe('GET', () => {
      it('Query with invalid cuisine and valid ingredient should fail and return 404', () => request(server)
        .get('/recipes/find')
        .send({ cuisine: "brian", ingredients: "butter"})
        .expect('Content-Type',  /text\/html/)
        .expect(404)
      )
    });

    describe('GET', () => {
      it('Query with fake combination should fail and return 404', () => request(server)
        .get('/recipes/find')
        .send({ cuisine: "brian", ingredients: "kim"})
        .expect('Content-Type',  /text\/html/)
        .expect(404)
      )
    });

    describe('GET', () => {
      it('Query with only valid cuisine should respond with 200 status when given one cuisine type', () => request(server)
        .get('/recipes/find')
        .send({ cuisine: "British"})
        .expect('Content-Type',  /text\/html/)
        .expect(200)
      )
    });
    
    describe('GET', () => {
      it('Query with only valid ingredient should respond with 200 status and json content type', () => request(server)
        .get('/recipes/find')
        .send({ ingredients: "butter"})
        .expect('Content-Type',  /text\/html/)
        .expect(200)
      )
    });

    describe('GET', () => {
      it('Query with only invalid cuisine should respond with 404 status ', () => request(server)
        .get('/recipes/find')
        .send({ cuisine: "Hemwatie"})
        .expect('Content-Type',  /text\/html/)
        .expect(404)
      )
    });
    
    describe('GET', () => {
      it('Query with only invalid ingredient should respond with 404 status and json content type', () => request(server)
        .get('/recipes/find')
        .send({ ingredients: "bananassss"})
        .expect('Content-Type',  /text\/html/)
        .expect(404)
      )
    });
    
  });

  const validData = { username: 'a', password: 'a' };
  const missingUser = { password: 'a' };
  const missingPass = { username: 'a' };
  const missingBoth = {};
  const invalidData = { username: 'banana', password: 'banana' };

  describe('/users/login', () => {
    describe('GET valid data', () => {
      it('responds with 200 status and json content type', () => {
        request(server)
          .get('/users/login')
          .send(validData)
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    })

    describe('GET missing username', () => {
      it('responds with 404 status and error', () => {
          return request(server)
            .get('/users/login')
            .send(missingUser)
            .expect(404);
      });
  })

  describe('GET', () => {
    it('responds with 404 status and error', () => {
      request(server)
        .get('/users/login')
        .send(missingPass)
        .expect(404);
    });
  })

  describe('GET', () => {
    it('responds with 404 status and error', () => {
      request(server)
        .get('/users/login')
        .send(missingBoth)
        .expect(404);
    });
  })

  describe('GET', () => {
    it('responds with 404 status and error', () => request(server)
      .get('/users/login')
      .send(invalidData)
      .expect(404)
      );
})
  });

// post fails
describe('Creates User', () => {
  describe('POST', () => {
    it('responds with 200 status and text/html content type', () => request(server)
      .post('/users/create')
      .send(invalidData)
      .expect('Content-Type', /text\/html/)
      .expect(200)
    )
  })
})
});


// it('responds to invalid request with 400 status and error message in body', async () => {
//   const newMarketList = [{ cards: 3 }];
//   const { body } = await request(server)
//     .put('/markets')
//     .send(newMarketList)
//     .expect(400);
//   expect(body).toHaveProperty('error');
// });


// describe('User Authentication', ()=>{
//     // it('should return status of 200 when finding a person from the database',  async()=>{
//       // const res = await (await req.get('/session')).send({
//       //   username:'hemwatiecodes',
//       // });
//       // expect(res.body).toBe('')
//     // })

// })

// describe("Test the root path", () => {
//   it("should receive response from the GET method", () => request(server)
//       .get('/')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(function(err,res){
//         if(err) throw err;
//       })
//   );
// });
