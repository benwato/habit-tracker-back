const router = require("express").Router();
const User = require("../../models/User");
const verify = require('../../routes/verifyToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const app = require('../../index.js')
const {
    loginValidation,
    registerValidation
} = require('../../validation')
const request = require('supertest')

describe('auth endpoints', () => {
    let api;
    beforeAll(async () => {
        api = app.listen(5000, () => console.log('test server running on port 5000'))
        
    })

    afterAll(done => {
        console.log('stopping test server')
        api.close(done)
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
    
        expect(res.user).toHaveProperty("_id")

    })

    it('should not allow registration with existing email', async()=> {

    })

    it('should allow an existing user to login', async () => {

    })
    it('should not allow login with invalid email', async() => {

    })
    it('should not allow login with invalid password', async() => {

    })
})