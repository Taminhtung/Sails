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
    login: function (req, res) {
        var username = req.param("username");
        var password = req.param("password");
        User.findOne({username:username, password: password}).exec(function (err, user) {
            if (err)  res.send(500, { error: "DB Error" });
            else 
                if (user) {
                    
                    var user_id = user.id;
                    User_role.find({user_id: user_id}).exec(function (err, data){
                        
                        if (err)  res.send(500, { error: "DB Error" });
                        else{
                            for (var i = 0; i < data.length; i++){
                                 Role_function.find({role_id : data[i].role_id}).exec(function (err, data1){
                                    if (err)  res.send(500, { error: "DB Error" });
                                    else {
                                         for (var j = 0; j < data1.length; j++){
                                            Func.find({id: data1[j].function_id}).exec(function(err, data2){
                                                  User_function.findOne({user_id:user_id, functionname: data2[0].functionname}).exec(function(err, data3){
                                                    if(err)  res.send(500, { error: "DB Error" });
                                                    else 
                                                        if(data3){}
                                                        else
                                                            User_function.create({user_id: user_id, functionname: data2[0].functionname}).exec(function (err,record){});
                                                  })

                                            }); 
                                        
                                        }
                 
                                    }

                                });
                            }
                        }      
                    });
                    

                    req.session.user = user;
                    res.send(user);

                }
                else res.send(404, { error: "User not Found" });
        });  
    },

    home: function (req, res) {
        var listfunction = [] ;

        if (req.session.user) {

            User_function.find({user_id:req.session.user.id}).exec(function(err, data){

                for(var i=0; i<data.length; i++){
                    listfunction.push(data[i].functionname);
                }

                res.view({username:req.session.user.username, listfunction:listfunction}); 
            });       
        }
        else 
            res.redirect('/');
        
    },
    
    createUser: function (req, res) {
         var username = req.param("username");
         var password = req.param("password");
         var rolename = req.param("rolename");
         if(req.session.user){
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
        }
        else{

        }
    },

    createRole: function (req, res) {
        if(req.session.user){
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
        }
        else{

        }         
    },

    
    createFunc: function (req, res) {
        if(req.session.user){
            var functionname = req.param("functionname");
           
            
            Func.findOne({functionname: functionname}).exec(function (err,func){
                if(err) throw err;
                
                else 
                    if(func){
                        
                    }

                    else{
                        Func.create({functionname: functionname}).exec(function (err,record){});
                    }


                
            });
        }
        else{

        }

    },

    add_user:function (req, res){
        
        if(req.session.user){
            Role.find().exec(function(err, data ){
                var t = [] ;
                for (var i = 0; i < data.length; i++){
                     t.push(data[i].rolename);
                }
                
                
                res.view({roles: t});

            });
       }

        else{
            res.send(404, "Lỗi");
        }
        
    },


    add_role:function (req, res){
        
        if(req.session.user){
            Func.find().exec(function(err, data ){
                var t = [] ;
                for (var i = 0; i < data.length; i++){
                     t.push(data[i].functionname);
                }
                
                
                res.view({Funcs: t});

            });
        }
        else{
            res.send(404, "Lỗi");
        }
    },

    add_func:function (req, res){
        
        if(req.session.user){
            Func.find().exec(function(err, data ){
                var t = [] ;
                for (var i = 0; i < data.length; i++){
                     t.push(data[i].functionname);
                }
                
               
                res.view({Funcs: t});

            });
        }
        else{

        }
    },


    process:function (req, res){
        if(req.session.user){ 
            var func = req.param("func");
            
            if(func=="Thêm User") {
                Role.find().exec(function(err, data ){
                var t = [] ;
                for (var i = 0; i < data.length; i++){
                     t.push(data[i].rolename);
                }
                    res.view("main/add_user",{roles: t});

                 });
            }

            else 
                if(func=="Thêm role"){
                    Func.find().exec(function(err, data ){
                    var t = [] ;
                    for (var i = 0; i < data.length; i++){
                         t.push(data[i].functionname);
                    }
                        
                    res.view("main/add_role",{Funcs: t});

                });

            }

         }

         else{

         }    
    }

}

module.exports = MainController;


