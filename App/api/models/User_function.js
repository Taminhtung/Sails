/**
 * User_function.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
     id : {
     	type : 'integer',
     	primaryKey: true,
     	autoIncrement : true

     },

     user_id: {
     	type : 'integer'
     },

     functionname:{
		  type : 'string',
		  size: 100
     }
  }
};

