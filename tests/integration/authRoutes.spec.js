const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require("express").Router();
const verify = require('../../middleware/auth');
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
    
        expect(res.body).toHaveProperty("_id")

    })

    it('should not allow registration with existing email', async()=> {
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