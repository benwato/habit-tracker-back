const mongoose = require('mongoose');
const User = require('../../models/User')
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

describe("User model tests", () => {
    beforeAll(async () => {
        await User.deleteMany({});
    })
    afterEach(async () => {
        await User.deleteMany({})
    })
    afterAll(async () => {
        await mongoose.connection.close()
    })

    it("has a module",() => {
        expect(User).toBeDefined();
    })
    describe("create user", () => {
        it("creates a user", async () => {
            const testUser = new User({name: "test",email:"test@email.com",password:"test-pass"})
            await testUser.save();
            const foundUser = await User.findOne({name: "test"});
            expect(foundUser.name).toEqual(testUser.name)
        })
    })
})

