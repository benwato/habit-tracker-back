const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require("express").Router();
const verify = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const app = require('../../server')
const User = require('../../models/User')
const {
    loginValidation,
    registerValidation
} = require('../../validation')
const request = require('supertest')
dotenv.config();
mongoose.connect(process.env.TEST_DB_CONNECT, {
    useNewUrlParser: true
}, () => {
    console.log('connected to db')
})
describe('habit endpoints', () => {
    let api;
    beforeAll(async () => {
        api = app.listen(5000, () => console.log('test server running on port 5000'))
        await User.deleteMany({});
        //registering
        

    })

    afterAll(async () => {
        console.log('stopping test server')
        console.log('and db')
        await mongoose.connection.close()
        await api.close()

    })

    it('cannot create habit without token', async () => {
        

        let res = await request(api)
            .post('/api/habits/add')
            .send({
                name: "test-name",
                completion: {
                    targetVal: 2,
                    currentVal: 0,
                },
                frequency: {
                    daily: true,
                    weekly: false,
                    monthly: false
                }
            })
            .set('Content-Type', 'application/json')

        expect(res.statusCode).toEqual(401);
    })
    it('can create habit with valid token', async () => {
        await request(api)
            .post('/api/user/register')
            .send({
                email: 'test-email@email.com',
                name: 'test-name',
                password: 'test-pass'
            })
            .set('Content-Type', 'application/json')
        //logging in
        let res = await request(api)
            .post('/api/user/login')
            .send({
                email: 'test-email@email.com',
                password: 'test-pass'
            })
            .set('Content-Type', 'application/json')
        const token = res.header["auth-token"];
        
        let res2 = await request(api)
            .post('/api/habits/add')
            .send({
                name: "test-name",
                completion: {
                    targetVal: 2,
                    currentVal: 0,
                },
                frequency: {
                    daily: true,
                    weekly: false,
                    monthly: false
                }
            })
            .set('Content-Type', 'application/json')
            .set('auth-token', token)
        expect(res2.statusCode).toEqual(201)
    })
    it('can update habit', async () => {
        let res = await request(api)
            .post('/api/user/login')
            .send({
                email: 'test-email@email.com',
                password: 'test-pass'
            })
            .set('Content-Type', 'application/json')
        const token = res.header["auth-token"];
        const res2 = await request(api)
            .patch('/api/habits/update/0')
            .send({
                name: "test-name",
                completion: {
                    targetVal: 3,
                    currentVal: 0,
                },
                frequency: {
                    daily: true,
                    weekly: false,
                    monthly: false
                }
            })
            .set('Content-Type', 'application/json')
            .set('auth-token', token)
        expect(res2.statusCode).toEqual(204)
    })

})