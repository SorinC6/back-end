const request = require('supertest');
const server = require('./server');
const db = require('../data/dbconfig');


describe('Server.js', () => {
    describe('The GET / route', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/');
      
        expect(response.status).toBe(200);
        });
    
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/');
      
        expect(response.status).toBe(200);
        });
    
    });

    

})
