"use strict";

/**
 * Created by alfred on August 24th 2016, 7:39:16 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var locationSchema = new Schema(
    {"name":"String","location":"String"}
);

var Location = mongoose.model('Location', locationSchema);
var LocationDao = new MongooseDao(Location);
 
module.exports = LocationDao;