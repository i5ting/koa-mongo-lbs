"use strict";

var router = require('koa-router')();
const co = require('co');

var $middlewares  = require('mount-middlewares')(__dirname);

// core controller
var $ = require('mount-controllers')(__dirname).gps_controller;

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

router.get('/new', $.new); 
 
router.get('/:id/edit', $.edit);

router.get('/', $.list);

router.post('/', $.create);

router.get('/:id', $.show);

router.patch('/:id', $.update);

router.delete('/:id', $.destroy);

// -- custom routes




module.exports = router;