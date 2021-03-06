var havenondemand = require('havenondemand')
const config = require('../config/config.js');
const Promise = require('bluebird');

var client = new havenondemand.HODClient(config('HAVEN_ON_DEMAND_API_KEY'));

var extractconcepts = function(data){
  return new Promise(function(resolve, reject){
    client.call('extractconcepts', data, function(err,resp,body){
      if(err){
        reject(err);
        return;
      }
      resolve(body);
    })
  });
}

var handler = function(request, reply){
  extractconcepts(request.payload).then(reply).catch(reply);
}

module.exports.handler = handler;
