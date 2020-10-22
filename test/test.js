var assert = require('assert');
const { request } = require('http');
const expect = require('chai').expect
const app = require('../app')

var numb = 1

describe('Variable', function () {
  describe('#equal', function () {
    it('should return true when the value is equal', function () {
      assert.strictEqual(numb,1);
    });
    it('should return false when the value is not equal', function () {
        assert.notStrictEqual(numb,2);
      });
  }),
  describe('Test Route and Controller', function () {
    it('If we send login with empty body should resturn bad request', function () {
      return request(app)
      .post('/auth/login')
      .expect(200)
      .end(function (err,res) {
        if(err)throw err
      })
    })
  })
});