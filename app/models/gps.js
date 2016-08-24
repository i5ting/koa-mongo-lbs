"use strict";

/**
 * Created by alfred on August 24th 2016, 5:37:49 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var gpsSchema = new Schema(
    {"name":"String","location":"String"}
);

var Gps = mongoose.model('Gps', gpsSchema);
var GpsDao = new MongooseDao(Gps);
 
module.exports = GpsDao;