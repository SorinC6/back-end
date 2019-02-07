const request = require('supertest');
const server = require('./server');
const db = require('../data/dbconfig');


describe('Server.js', () => {
    describe('The GET / route', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/');
      
        expect(response.status).toBe(200);
        });
    
        it('should not respond with and error code', async () => {
            let response = await request(server).get('/');
      
        expect(response.status).not.toBe(404);

        expect(response.status).not.toBe(500);
        });

        it('should always return an string data ', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/html/i);
        });
        
        it('should not return JSON data', async () => {
            let response = await request(server).get('/');
            expect(response.type).not.toMatch(/json/i);
        });

    
    });

    describe("server.js POST register route", () => {
        describe('POST /api/register route', () => {
            let response;
        
            afterEach(async() => {
                await db('users').truncate();
            });

             
            beforeAll( async () => { 
                // jest.setTimeout(15000);
                response = await request(server).post('/api/register')
                .send({ username: 'new user', password: 'pass', role: 1 });
            });
        
    
            it('should return status code of 201 when working correctly', () => {
                
                expect(response.status).toBe(201);
            });
    
    
            it('should return message if the game was succesfully added', () => {
                
                expect(response.body).toEqual([ 1 ]);
            });

            it('should return an array', () => {
                expect(Array.isArray(response.body)).toBeTruthy();
              });
    
            
        });

        describe('POST /api/register route when the wrong info is sent',  () => {
            let response;

            afterEach(async () => {
                await db('users').truncate();
            });
             
            beforeEach(async () => { 
                // jest.setTimeout(15000);
                response = await request(server).post('/api/register')
                .send({ role: 1 });
            });


            it('should return status code of 500 without username or password included', () => {
                
                expect(response.status).toBe(500);
            });
    
            it('should return message if data was not added', () => {
                
                expect(response.body).toEqual({});
                // Error: `You have not been Registered.`
            });
    

        });
    
    });

    describe("server.js post Login route", () => {
        describe('POST /api/login route', () => {
            let response;
        
            afterEach(async() => {
                await db('users').truncate();
            });

             
            beforeAll( async () => { 
                // jest.setTimeout(15000);
                response = await request(server).post('/api/register')
                .send({ username: 'new user', password: 'pass', role: 1 });

                response = await request(server).post('/api/login')
                .send({ username: 'new user', password: 'pass', role: 1 });
            });
        
    
            it('should return status code of 201 when working correctly', () => {
                
                expect(response.status).not.toBe(401);
            });
    
    
            it('should return message if the game was succesfully added', () => {
                
                expect(response.body).not.toEqual({
                    message: "Welcome new user !",
                    token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldyB1c2VyIiwicGFzc3dvcmQiOiIkMmEkMTQka28zSmFEL0E1REpUZ2xIaWtNdWc4LmQ3dkdoQ3RuekxSa2JuZUYuOXlpTnV4dXhvRll4OGEiLCJpYXQiOjE1NDk1NjU3MDcsImV4cCI6MTU1MDE3MDUwN30.k-btDzDLHXrZhUiX8-o3-Jml65LgFRmsO6kqIlJdLYo"
                });
            });

            it('should not return an array', () => {
                expect(Array.isArray(response.body)).toBeFalsy();
              });
    
            
        });

        describe('POST /api/login route when the wrong info is sent',  () => {
            let response;

            afterEach(async () => {
                await db('users').truncate();
            });
             
            beforeEach(async () => { 
                // jest.setTimeout(15000);
                // jest.setTimeout(15000);
                response = await request(server).post('/api/register')
                .send({ username: 'new user', password: 'pass', role: 1 });

                response = await request(server).post('/api/login')
                .send({ role: 1 });
            });


            it('should return status code of 422 without username or password included', () => {
                
                expect(response.status).toBe(500);
            });
    
            it('should return message if the game was not added', () => {
                
                expect(response.body).toEqual({ message: "You may not login!" });
            });
    

        });

        describe('POST /api/login route when the wrong info is sent',  () => {
            let response;

            afterEach(async () => {
                await db('users').truncate();
            });
             
            beforeEach(async () => { 
                // jest.setTimeout(15000);
                // jest.setTimeout(15000);
                response = await request(server).post('/api/register')
                .send({ username: 'new user', password: 'pass', role: 1 });
                
                await db('users').truncate();
                response = await request(server).post('/api/login')
                .send({ username: 'new user', password: 'pass', role: 1 });
            });


            it('should return status code of 422 without username or password included', () => {
                
                expect(response.status).toBe(401);
            });
    
            it('should return message if the game was not added', () => {
                
                expect(response.body).toEqual({ message:  "You are not authorized to login!" });
            });
    

        });
    
    
    });

    // describe('the fnct protected Function', () => {
    //     it('should return message if the game was not added', () => 

    //         const token = generateUserToken(user);
    //         // generateUserToken({ username: 'new user', password: 'pass', role: 1 });
                
    //         expect(generateUserToken({ username: 'new user', password: 'pass', role: 1 })).toEqual({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ldyB1c2VyIiwicGFzc3dvcmQiOiIkMmEkMTQka28zSmFEL0E1REpUZ2xIaWtNdWc4LmQ3dkdoQ3RuekxSa2JuZUYuOXlpTnV4dXhvRll4OGEiLCJpYXQiOjE1NDk1NjU3MDcsImV4cCI6MTU1MDE3MDUwN30.k-btDzDLHXrZhUiX8-o3-Jml65LgFRmsO6kqIlJdLYo"});
    //     });


    // });

})
