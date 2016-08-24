import test from 'ava'
import superkoa from 'superkoa'

var model = 'gps'

var gps

var app = require('path').join(__dirname, '../../app.js')

var mockGps = {
  // 'gpsname': 'alfred',
  // 'password': '000000'
}

test.before(function * (t) {
  var res = yield superkoa(app)
    .post('/api/' + model)
    .send(mockGps)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  gps = res.body.gps

  t.is(200, res.status)
})

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /gps[/]        => gps.list()
 *  GET    /gps/new       => gps.new()
 *  GET    /gps/:id       => gps.show()
 *  GET    /gps/:id/edit  => gps.edit()
 *  POST   /gps[/]        => gps.create()
 *  PATCH  /gps/:id       => gps.update()
 *  DELETE /gps/:id       => gps.destroy()
 *
 */

// *  GET    /gps[/]        => gps.list()
test('GET /' + model, function * (t) {
  var res = yield superkoa(app)
    .get('/' + model)

  t.is(200, res.status)
  t.regex(res.text, /table/g)
})

// *  GET    /gps/new       => gps.new()
test('GET /' + model + '/new', function * (t) {
  var res = yield superkoa(app)
    .get('/' + model + '/new')

  t.is(200, res.status)
  t.regex(res.text, /New\sgps/)
})

// *  GET    /gps/:id       => gps.show()
test('GET /' + model + '/:id show', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockGps)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  gps = res1.body.gps

  var res = yield superkoa(app)
    .get('/' + model + '/' + gps._id)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  GET    /gps/:id/edit  => gps.edit()
test('GET /' + model + '/:id/edit', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockGps)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  gps = res1.body.gps

  var res = yield superkoa(app)
    .get('/' + model + '/' + gps._id + '/edit')

  t.is(200, res.status)
  t.regex(res.text, /Editing\sgps/)
})

// *  POST   /gps[/]        => gps.create()
test('POST /' + model, function * (t) {
  var res = yield superkoa(app)
    .post('/' + model)
    .send(mockGps)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  PATCH  /gps/:id       => gps.update()
test('PATCH /' + model + '/:id update', function * (t) {
  var res = yield superkoa(app)
    .patch('/' + model + '/' + gps._id)
    .send({
      'gpsname': 'alfred',
      'password': '111111'
    })
  // console.log(res)
  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// *  DELETE /gps/:id       => gps.destroy()
test('DELETE /' + model + '/:id destroy', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockGps)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  gps = res1.body.gps

  var res = yield superkoa(app)
    .del('/' + model + '/' + gps._id)

  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// api
test('API GET /api/' + model, function * (t) {
  var res = yield superkoa(app)
    .get('/api/' + model)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API POST /api/' + model, function * (t) {
  var res = yield superkoa(app)
    .post('/api/' + model)
    .field('gpsname', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:gps_id', function * (t) {
  var res = yield superkoa(app)
    .get('/api/' + model + '/:gps_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API PATCH /api/' + model + '/:gps_id', function * (t) {
  var res = yield superkoa(app)
    .patch('/api/' + model + '/:gps_id')
    .field('gpsname', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:gps_id', function * (t) {
  var res = yield superkoa(app)
    .delete('/api/' + model + '/:gps_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})
