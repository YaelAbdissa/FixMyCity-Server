var assert = require('assert');
var expect = require('chai').expect
var app = require('../app')
var  request  = require('supertest')(app);

var numb = 1



describe('Test Login Route', function () {
    it('If we send login with empty body should return bad request', function () {
      return request.post('/auth/login')
       .send({})
      .expect(400)
    })
  
    it('If we send with invalid email/password it should return 401 ', function () {
      return request.post('/auth/login')
      .send({
        "email" : "test@gmail.com",
        "password" : "test-password"
      })
     .expect(400)
   })
  
   it('If we send with valid email/password it should return 200', function () {
    return request.post('/auth/login')
    .send({
      "email" : "eyaelabdissa24@gmail.com",
      "password" : "password"
    })
   .expect(200)
  })
})

describe('Test  reports route', function(){
    it('return reports', function(){
      return request.get('/reports')
      .expect(200)
    })
})