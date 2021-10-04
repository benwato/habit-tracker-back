const mongoose = require('mongoose');
const Habit = require('../../models/Habit');
const User = require('../../models/User')
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.TEST_DB_CONNECT, {
    useNewUrlParser: true
}, () => {
    console.log('connected to db')
})

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

