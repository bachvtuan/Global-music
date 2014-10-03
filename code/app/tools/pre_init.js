
global.throwError = function(res,obj){
  res.status(401).json(obj);
}

//Middleware to attach database
global.attachDB = function(req, res, next) {
  //db is global varriable
  req.db = db;
  next();
};