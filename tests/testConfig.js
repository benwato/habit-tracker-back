const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require("express").Router();
const verify = require('../../routes/verifyToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const app = require('../../index.js')
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

global.app = app;
global.request = request;
