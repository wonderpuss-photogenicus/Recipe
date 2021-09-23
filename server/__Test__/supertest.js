const recipeController = '../controllers/recipeController.js';
const {Recipe, User} = '../models/Models.js'
const supertest = 'supertest';
const app = express();
const req = supertest(app);

describe('DB connectivity Test', () => {
  let connection;
 
  beforeAll(async () => {
  });

  afterAll(async () => {
  });

  describe('Recipes', ()=>{
    //test for correct type, and correct returned value 
    it('should return status of 200 when finding recipe from the database', async () => {
      const res = await req.get('/recipes/find').send({
        cuisine: "British",
        ingredient: "milk"
      });
      expect(res.status).toBe(200);
    })
      //test for no req.body
    it('should return ', async () => {
      const res = await req.get('/recipes/find').send({
        cuisine: "Korean",
        tools: "chopsticks"
      });
      
      expect(res.body).toBe('no data found');
    })
  })
  

})  