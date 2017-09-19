/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var MainController = {
    index: function (req, res) {

        res.view();
    },
    // signup: function (req, res) {
        
    // },
    
    createUser: function (req, res) {
         var username = req.param("username");
         var password = req.param("password");
         var rolename = req.param("rolename");
       
        
        Role.findOne({rolename: rolename}).exec(function (err,role){
            if(err) throw err;
            else {

                User.findOne({username:username}).exec(function (err,user){
                    if(err) throw err;
                    else 
                    if(user){
                        User_role.findOne({user_id: user.id, role_id: role.id}).exec(function (err,record){
                            if(record){
                                
                            }
                            else{
                                User_role.create({user_id: user.id, role_id: role.id}).exec(function (err,record){});
                            }
                        });
                    }
                    else{
                        User.create({username:username, password: password}).exec(function (err,user){
                            User_role.create({user_id: user.id, role_id: role.id}).exec(function (err,record){});

                        });

        
                    }
                });



            }
            
        });
        


        
        
        
    },

    createRole: function (req, res) {
         var rolename = req.param("rolename");
         var functionname = req.param("functionname");
       
        
        Func.findOne({functionname: functionname}).exec(function (err,func){
            if(err) throw err;
            else {

                Role.findOne({rolename:rolename}).exec(function (err,role){
                    if(err) throw err;
                    else 
                    if(role){
                        Role_function.findOne({role_id: role.id, function_id: func.id}).exec(function (err,record){
                            if(record){
                                
                            }
                            else{
                                Role_function.create({role_id: role.id, function_id: func.id}).exec(function (err,record){});
                            }
                        });
                    }
                    else{
                        Role.create({rolename:rolename}).exec(function (err,role){
                            Role_function.create({role_id: role.id, function_id: func.id}).exec(function (err,record){});

                        });

        
                    }
                });



            }
            
        });
               
    },

    
    createFunc: function (req, res) {
         var functionname = req.param("functionname");
       
        
        Func.findOne({functionname: functionname}).exec(function (err,func){
            if(err) throw err;
            
            else 
                if(func){
                    
                }

                else{
                    console.log(functionname);
                    Func.create({functionname: functionname}).exec(function (err,record){});
                }


            
        });
        


        
        
        
    },



    add_user:function (req, res){
        

        Role.find().exec(function(err, data ){
            var t = [] ;
            for (var i = 0; i < data.length; i++){
                 t.push(data[i].rolename);
            }
            
            
            res.view({roles: t});

        });
        
    },


    add_role:function (req, res){
        

        Func.find().exec(function(err, data ){
            var t = [] ;
            for (var i = 0; i < data.length; i++){
                 t.push(data[i].functionname);
            }
            
            console.log(t);
            res.view({Funcs: t});

        });
    },

    add_func:function (req, res){
        

        Func.find().exec(function(err, data ){
            var t = [] ;
            for (var i = 0; i < data.length; i++){
                 t.push(data[i].functionname);
            }
            
            console.log(t);
            res.view({Funcs: t});

        });
    }


}

module.exports = MainController;


