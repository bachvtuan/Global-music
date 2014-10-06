var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user_name: String,
  email: String,
  password: String,
  created_date:{ type: Date, default: Date.now() },
  status:{ type: String, default: 'actived' }
})

mongoose.model('User', userSchema)

var albumSchema = mongoose.Schema({
  userId: ObjectId,
  title: String,
  //Store base64
  cover:String,
  created_date:{ type: Date, default: Date.now() },
  status:{ type: String, default: 'actived' }
})

mongoose.model('Album', albumSchema)