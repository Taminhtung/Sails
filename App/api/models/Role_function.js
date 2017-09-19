/**
 * Role_function.js
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

     role_id: {
     	type : 'integer'
     	
     },

     function_id:{
		type : 'integer'
     }
  }
};

