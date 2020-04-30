const request = require('supertest');
const server = require('./server');
// it.todo('');
describe('server', () => {
    it('should set the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('POST /', () => {
        it('should return a status of 200', async () => {
            const res = await request(server).post('/').send({
                username: 'Korra',
                password: 'i<3naaga',
                nation: 'Water Tribe',
            });

            expect(res.status).toBe(200);
        });

        it('should return correct response', async () => {
            const res = await request(server).post('/').send({
                username: 'Asami',
                password: 'i<3Korra',
                nation: 'Republic City',
            });

            expect(res.body).toEqual({
                id: 2,
                username: 'Asami',
                password: 'i<3Korra',
                nation: 'Republic City',
            });
        });

        it('throws an error with incorrect/missing info', async () => {
            const res = await request(server).post('/').send({
                username: 'Nuktuk',
                nation: 'The World',
            });

            expect(res.status).toBe(500);
        });
    });

    describe('GET /', () => {
        it('should return a status of 200', async () => {
            const res = await request(server).get('/');

            expect(res.status).toBe(200);
        });

        it('should return JSON type', async () => {
            // test content type header
            const res = await request(server).get('/');

            expect(res.type).toBe('application/json');
        });

        it('should return correct content', async () => {
            const res = await request(server).get('/');

            // res.body should return an array since this endpoint gets all of the users
            expect(res.body).toEqual([
                {
                    id: 1,
                    username: 'Korra',
                    password: 'i<3naaga',
                    nation: 'Water Tribe',
                },
                {
                    id: 2,
                    username: 'Asami',
                    password: 'i<3Korra',
                    nation: 'Republic City',
                },
            ]);
        });
    });

    describe('DELETE /', () => {
        it('should return a status of 200', async () => {
            const res = await request(server).delete('/1');

            expect(res.status).toBe(200);
        });

        it('should throw an error with invalid id', async () => {
            const res = await request(server).delete('/10');

            expect(res.status).toBe(404);
        });
    });
});

// status code
// return code, body, headers
// format, format headers
