const mongoose = require('mongoose')
const { User } = require('../models/User')

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const assert = require('assert')

chai.use(chaiHttp);

describe('User-Register', () => {
    beforeEach(done => {
        User.remove({}, err => {
            done()
        })
    })

    describe('/register', () => {
        it('[it should post user register]', done => {
            let request = {
                name: "anton",
                email: "anton@mail.com",
                password: '1234qwer'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    assert.deepStrictEqual(res.body, {}, 'assert is not same')
                    done()
                })
        })
    })
    describe('/login', () => {
        beforeEach(done => {
            let request = {
                name: "anton",
                email: "anton@mail.com",
                password: '1234qwer'
            }
            chai.request(server)
                .post('/api/auth/register')
                .send(request)
                .end((err, res) => {
                    done()
                })
        })
        it('[it user should login]', (done) => {
            let request = {
                email: "anton@mail.com",
                password: '1234qwer'
            }
            chai.request(server)
                .post('/api/auth/login')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    assert.deepStrictEqual(res.body, {}, 'assert is not same')
                    done()
                })
        })
    })
})