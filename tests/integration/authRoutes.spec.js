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
dotenv.config();
mongoose.connect(process.env.TEST_DB_CONNECT, {
    useNewUrlParser: true
}, () => {
    console.log('connected to db')
})
const request = require('supertest')

describe('auth endpoints', () => {
    let api;
    beforeAll(async () => {
        api = app.listen(5001, () => console.log('test server running on port 5000'))
        await User.deleteMany({});
        
    })

    afterAll(async () => {
        console.log('happily closing test server and db')
        await mongoose.connection.close()
        await api.close()
    })

    it('should allow a new user to register', async () => {
        
        const res = await request(api)
            .post('/api/user/register')
            .send({
                email: 'test-email@email.com',
                name: 'test-name',
                password: 'test-pass'
            })
            .set('Content-Type','application/json')
        
        expect(res.statusCode).toEqual(201);
    
        expect(res.body).toHaveProperty("_id")

    })

    it('should not allow registration with existing email', async()=> {
        await request(api)
            .post('/api/user/register')
            .send({
                email: 'test-email@email.com',
                name: 'test-name',
                password: 'test-pass'
            })
            .set('Content-Type','application/json')
        const res = await request(api)
            .post('/api/user/register')
            .send({
                email: 'test-email@email.com',
                name: 'test-name',
                password: 'test-pass'
            })
            .set('Content-Type','application/json')

        expect(res.statusCode).toEqual(400)
        // expect(res.body).toEqual('email already in use')
    })

    it('should allow an existing user to login', async () => {
        const res = await request(api)
            .post('/api/user/login')
            .send({
                email: 'test-email@email.com',
                password: 'test-pass'
            })
            .set('Content-Type','application/json')
        expect(res.statusCode).toEqual(200)
    })

    it('should give back a token on login', async () => {
        const res = await request(api)
            .post('/api/user/login')
            .send({
                email: 'test-email@email.com',
                password: 'test-pass'
            })
            .set('Content-Type','application/json')
        expect(res.header["auth-token"]).toBeDefined();
    })

    it('should not allow login with invalid email', async() => {
        const res = await request(api)
            .post('/api/user/login')
            .send({
                email: 'invalid@email.com',
                password: 'test-pass'
            })
            .set('Content-Type','application/json')
        expect(res.statusCode).toEqual(400)

    })
    it('should not allow login with invalid password', async() => {
        const res = await request(api)
            .post('/api/user/login')
            .send({
                email: 'test-email@email.com',
                password: 'test-pass-incorrect'
            })
            .set('Content-Type','application/json')
        expect(res.statusCode).toEqual(400)

    })
})