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

    describe("server.js post routes", () => {
        describe('POST /api/register route', () => {
            let response;
        
            afterEach(async() => {
                await db('users').truncate();
            });

            // afterEach(async () => {
            //     await db('users').truncate();
            // });
             
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


            it('should return status code of 422 without username or password included', () => {
                
                expect(response.status).toBe(422);
            });
    
            it('should return message if the game was not added', () => {
                
                expect(response.body).toEqual({ Error: 'Please add the title and genre' });
            });
    

        });
    
    });

})
