'use strict';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const mockReq = supergoose(server.server);
const bcrypt = require('bcrypt');

require('dotenv').config();

let users = {
    user: { username: 'user', password: 'test', role: 'user' },
    editor: { username: 'editor', password: 'test', role: 'editor' },
    admin: { username: 'admin', password: 'test', role: 'admin' }
};
describe('admain', () => {
    let token;
    let id;
    it('sign up', async () => {
        const response = await mockReq.post('/signup').send({ username: 'admin', password: 'test', role: 'admin' });
        // console.log('res signup', response.body);
        expect(response.status).toEqual(201);

        token = response.body.token;
    })
    it('sign in', async () => {
        const response = await mockReq.post('/signin').auth('admin', 'test');
        expect(response.status).toEqual(200);
        token = response.body.token;
    })
    it('post', async () => {
        let data = ({ name: "appel", calories: "1000", type: "fruit" });
        const response = await mockReq.post('/api/v2/food').send(data).set({ "Authorization": `Beare ${token}` });
        // console.log('res post', response.body);
        expect(response.status).toEqual(201);
        id = response.body._id;
    })
    // it('get ', async () => {
    //     const response = await mockReq.get(`/api/v2/food`).set({ "Authorization": `Beare ${token}` });
    //     expect(response.status).toEqual(200);
    // })

    // it('get by id', async () => {
    //     const response = await mockReq.get(`/api/v2/food/${id}`).set({ "Authorization": `Beare ${token}` });
    //     console.log('res post', response.body);
    //     expect(response.status).toEqual(200);
    // })

    it('delete by id', async () => {
        const response = await mockReq.delete(`/api/v2/food/${id}`).set({ "Authorization": `Beare ${token}` });
        expect(response.status).toEqual(200);
    })


})


