const mongoose = require('mongoose');
const MONG_URI = "mongodb+srv://recipe:xEdjACEJRAqf9f8L@cluster0.vd3fp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const recipeController = '../controllers/recipeController.js';
const {Recipe, User} = '../models/Models.js'
const supertest = 'supertest';

xdescribe('DB connectivity Test', () => {
  let connection;
 
  beforeAll(async () => {
    connection = await mongoose.connect(MONG_URI, {
      useUnifiedTopology: true,
      dbName:'test'
    })
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('', ()=>{
    //test for correct type, and correct returned value 
    it('')
      //test for no req.body
    it('', async () => {
    
    })
  })
  

})  