const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbconfig');



describe('The APIs Get Endpoints', function() {
    
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

    // describe('GET `/books` route', async () => {
    //     afterEach(async () => {
    //         await db('users').truncate();
    //     });
 
    //     beforeEach(() => {
    //         jest.setTimeout(15000);
    //         //   response = await request(server).get('/demo/api/books');
    //     });

    //     // let response;
    //     // beforeAll(async () => {
    //     // });
      
    //     it('should return a status code of 200', async () => {
    //         let response = await request(router).get('demo/api/books');
    //         expect(console.log).toBe('books get request working');
    //       expect(response.status).toBe(200);
    //     });
      
    //     it('should return an array', async () => {
    //         let response = await request(server).get('/books');
    //       expect(Array.isArray(response.body)).toBeTruthy();
    //     });
    
    //     it('should always not return an string data ', async () => {
           
    //         expect(response.type).not.toMatch(/html/i);
    //     });
        
    //     it('should return JSON date', async () => {
           
    //         expect(response.type).toMatch(/json/i);
    //     });
    
    // });
    
    describe('GET / reviews route', () => {
        let response;
        beforeAll(async () => {
          response = await request(server).get('/demo/api/reviews');
        });
      
        it('should return a status code of 200', () => {
          expect(response.status).toBe(200);
        });
      
        it('should return an array', () => {
          expect(Array.isArray(response.body)).toBeTruthy();
        });
    
        it('should always not return an string data ', async () => {
           
            expect(response.type).not.toMatch(/html/i);
        });
        
        it('should return JSON date', async () => {
           
            expect(response.type).toMatch(/json/i);
        });
    
    });
    
    
    describe('GET / users route', () => {
        let response;
        beforeAll(async () => {
          response = await request(server).get('/demo/api/users');
        });
      
        it('should return a status code of 200', () => {
          expect(response.status).toBe(200);
        });
      
        it('should return an array', () => {
          expect(Array.isArray(response.body)).toBeTruthy();
        });
    
        it('should always not return an string data ', async () => {
           
            expect(response.type).not.toMatch(/html/i);
        });
        
        it('should return JSON date', async () => {
           
            expect(response.type).toMatch(/json/i);
        });
    
    });

});