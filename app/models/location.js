"use strict";

/**
 * Created by alfred on August 24th 2016, 7:41:54 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var locationSchema = new Schema(
    {
      "name":"String",
      "coordinates": {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
      },
      "created_at": {
        type: Date,
        "default": Date.now()
      },
      "created_at_unix": {
        type: Number,
        "default": Math.round(new Date().getTime()/1000)
      }
      
      
    }
);

var Location = mongoose.model('Location', locationSchema);
var LocationDao = new MongooseDao(Location);
 
module.exports = LocationDao;