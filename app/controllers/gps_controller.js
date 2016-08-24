"use strict";

/**
 * Created by Moajs on August 24th 2016, 5:37:49 pm.
 */
 
var $models = require('mount-models')(__dirname);

var Gps = $models.gps;


exports.list = (ctx, next) => {
  console.log(ctx.method + ' /gps => list, query: ' + JSON.stringify(ctx.query));

  return Gps.getAllAsync().then(( gps)=>{
    return ctx.render('gps/index', {
      gps : gps
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.new = (ctx, next) => {
  console.log(ctx.method + ' /gps/new => new, query: ' + JSON.stringify(ctx.query));

  return ctx.render('gps/new', {
    gps : {
      "_action" : "new"
    }
  })
};

exports.show = (ctx, next) => {
  console.log(ctx.method + ' /gps/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  var id = ctx.params.id;

  return Gps.getByIdAsync(id).then( gps => {
    console.log(gps);
    return ctx.render('gps/show', {
      gps : gps
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.edit = (ctx, next) => {
  console.log(ctx.method + ' /gps/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  var id = ctx.params.id;

  return Gps.getByIdAsync(id).then( gps => {
    console.log(gps);
    gps._action = 'edit';

    return ctx.render('gps/edit', {
      gps : gps
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.create = (ctx, next) => {
  console.log(ctx.method + ' /gps => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  return Gps.createAsync({name: ctx.request.body.name,location: ctx.request.body.location}).then( gps => {
    console.log(gps);
    return ctx.render('gps/show', {
      gps : gps
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.update = (ctx, next) => {
  console.log(ctx.method + ' /gps/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

    var id = ctx.params.id;

    return Gps.updateById(id,{name: ctx.request.body.name,location: ctx.request.body.location}).then( gps => {
      console.log(gps);

      return ctx.body = ({
        data:{
          redirect : '/gps/' + id
        },
        status:{
          code : 0,
          msg  : 'delete success!'
        }
      });
    });
};

exports.destroy = (ctx, next) => {
  console.log(ctx.method + ' /gps/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  var id = ctx.params.id;
  return Gps.deleteByIdAsync(id).then( () =>{
    return ctx.body= ({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

// -- custom

// -- custom api
exports.api = {
  list: (ctx, next) => {
    var gps_id = ctx.api_gps._id;

    return Gps.queryAsync({}).then((gps) => {
      return ctx.api({
        gps : gps
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  show: (ctx, next) => {
    var gps_id = ctx.api_gps._id;
    var id = ctx.params.gps_id;

    return Gps.getByIdAsync(id).then((gps)=>{
      return ctx.api({
        gps : gps
      });
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  create: (ctx, next) => {
    var gps_id = ctx.api_gps._id;

    return Gps.createAsync({name: ctx.request.body.name,location: ctx.request.body.location}).then(gps=> {
      return ctx.body = ({
        gps : gps
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });

  },
  update: (ctx, next) => {
    var gps_id = ctx.api_gps._id;
    var id = ctx.params.gps_id;
    return Gps.updateByIdAsync(id, {name: ctx.request.body.name,location: ctx.request.body.location}).then(gps=> {
      return ctx.api({
        gps : gps,
        redirect : '/gps/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  delete: (ctx, next) => {
    var gps_id = ctx.api_gps._id;
    var id = ctx.params.gps_id;

    return Gps.deleteByIdAsync(id).then(function(){
      return ctx.api({id: id})
    }).catch((err)=>{
      return ctx.api_error(err);
    }); 
  }
}
