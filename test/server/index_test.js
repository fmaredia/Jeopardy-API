var request = require('supertest')
var assert  = require('assert')
var routes = require(__server + '/index.js')

describe("The Server", function() {

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  it("GET /api/questions/random responds with a random question", function(done) {
    return request(app)
      .get('/api/questions/random')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(function(response) {
        var res = response.body
        assert.equal(typeof res.question, "string", "question should defined");
        assert.equal(typeof res.answer, "string", "answer should defined");
        assert.equal(typeof res.value, "number", "number should defined");
      })
      .end(done)
  })

  it("GET /api/episodes responds with all episodes", function(done) {
    return request(app)
      .get('/api/episodes')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(function(response) {
        var res = response.body
        for (var i = 0; i < res.length; i++) {
          assert.equal(typeof res[i].episode_number, "string", "episode_number should be defined");
        }
      })
      .end(done)
  })

  it("GET /api/categories responds with all categories", function(done) {
    return request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(function(response) {
        var res = response.body
        for (var i = 0; i < res.length; i++) {
          assert.equal(typeof res[i].category, "string", "category should be defined");
        }
      })
      .end(done)
  })

  it("GET /api/finaljeopardy responds with all Final Jeopardy questions", function(done) {
    return request(app)
      .get('/api/finaljeopardy')
      .set('Accept', 'application/json')
      .expect(200)
      .expect(function(response) {
        var res = response.body
        for (var i = 0; i < res.length; i++) {
          assert.equal(res[i].round, "Final Jeopardy!", "Question's round value should be Final Jeopardy");
        }
      })
      .end(done)
  })  
})
