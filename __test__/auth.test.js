const supergoose = require('@code-fellows/supergoose');
const { response } = require('express');
const server = require('../src/server');
const mockReq = supergoose(server.server);
require('dotenv').config();
process.env.SECRET = 'ajaz';

let users = {
    user: { username: 'user', password: 'test', role: 'user' },
    editor: { username: 'editor', password: 'test', role: 'editor' },
    admin: { username: 'admin', password: 'test', role: 'admin' }
};

describe('sign-in/up', () => {
    Object.keys(users).forEach(user => {
        it('sign up test', async () => {
            const response = await mockReq.post('/signup').send(users[user]);
            expect(response.status).toEqual(201);
            expect(response.body.user.username).toEqual(users[user].username);
            expect(response.body.token).toBeDefined();
        })
        it('sign in test', async () => {
            const response = await mockReq.post('/signin').auth(users[user].username, users[user].password);
            expect(response.status).toEqual(200);
            expect(response.body.user.username).toEqual(users[user].username);
            expect(response.body.token).toBeDefined();
        })
    })

})

let token;

describe('/users and secret', () => {
    it('/secret', async () => {
        const response = await mockReq.post('/signin').auth(users.user.username, users.user.password);
        token = response.body.token;
        const res2 = await mockReq.get('/secret').set(`Authorization`, `Bearer ${token}`)
        expect(res2.status).toEqual(200);


    })

    it('/users', async () => {
        const response = await mockReq.post('/signin').auth(users.admin.username, users.admin.password);
        token = response.body.token;
        const res2 = await mockReq.get('/users').set({ Authorization: `Bearer ${token}` });
        expect(res2.status).toEqual(200);


    })
})
