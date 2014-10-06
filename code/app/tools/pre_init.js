
global.throwError = function(res,obj){
  res.status(401).json(obj);
}

//Middleware to attach database
global.attachDB = function(req, res, next) {
  //db is global varriable
  //req.db = db;
  next();
};

//Middleware to attach database
global.checkUser = function(req, res, next) {
  //db is global varriable
  //req.db = db;
  if (!req.session.user){
    return res.json(jsonError("You're not login"));
  }
  
  next();
};

