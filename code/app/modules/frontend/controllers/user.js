module.exports = function(BaseController){
 return BaseController.extend({ 
    name: "user",
    index: function(req, res, next) {
      res.json("how");
    },
    register: function(req, res, next) {
      res.json("login");
    },
    register: function(req, res, next) {
      console.log("req.body");
      console.log(req.body);
      res.json( jsonSucc( req.body ) );

    }
  });
}
 

