const request = require('supertest');
const { Genre } = require('../../models/genre')
const {User} = require('../../models/user');
let server = require

describe('/api/genres', () => {  
    beforeEach(async () => { 
        server = require('../../index');
        await Genre.deleteMany({}); // Clean before each test
    });
    afterEach(async () => { 
        await server.close();
        await Genre.deleteMany({}); // Clean after each test
    });
    
    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' }
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });
});

describe('GET /:id', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        await server.close();
        await Genre.deleteMany({});
    });

    it('should return a genre if valid id is passed', async () => {
        const genre = new Genre({ name: 'genre1' });
        await genre.save(); 
        const res = await request(server).get('/api/genres/' + genre._id);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', genre.name);
    });

     it('should return 404 if invalid id is passed', async () => {
        const res = await request(server).get('/api/genres/1');
        expect(res.status).toBe(404);
    });
})

describe('POST /', () => {
    it('should return 401 if client is not logged in', async () => {
        request(server)
            .post('/api/genres')
            .send({ name: 'genre1' })
            .then(res => {
                expect(res.status).toBe(401);
            });
    });

    it('should return 400 if genre is less than 5 characters', async () => {
        const token = new User().generateAuthToken();
        request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: '1234' })
            .then(res => {
                expect(res.status).toBe(400);
            });
    });

    it('should return 400 if genre is more than 50 characters', async () => {
        const token = new User().generateAuthToken();
        const longName = new Array(52).join('a'); // 51 characters
        request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: longName })
            .then(res => {
                expect(res.status).toBe(400);
            });
    });

    it('should save the genre if it is valid', async () => {
        const token = new User().generateAuthToken();
        const res = await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
        expect(res.status).toBe(200);
    });

});