var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  user_name: String,
  email: String,
  password: String,
  created_date:{ type: Date, default: Date.now() },
  status:{ type: String, default: 'actived' }
})

mongoose.model('User', userSchema)

/** end User **/

var tagSchema = mongoose.Schema({
  user_id: mongoose.Schema.ObjectId,
  //Store base64
  name:String,
  created_date:{ type: Date, default: Date.now() },
  status:{ type: String, default: 'actived' }
})

mongoose.model('Tag', tagSchema)

/** end Tag **/

var albumSchema = mongoose.Schema({
  user_id: mongoose.Schema.ObjectId,
  title: String,
  feature_id: mongoose.Schema.ObjectId,
  song_numbers:{ type: Number, default: 0 },
  tags:{ type: [tagSchema] },
  created_date:{ type: Date, default: Date.now() },
  status:{ type: String, default: 'actived' }
})

mongoose.model('Album', albumSchema)

/** end Album **/

var mediaSchema = mongoose.Schema({
  user_id: mongoose.Schema.ObjectId,
  //Store base64
  data:String,
  link:String,
  mime_type:String,
  created_date:{ type: Date, default: Date.now() },
  status:{ type: String, default: 'actived' }
})

mongoose.model('Media', mediaSchema)

/** end Media **/

