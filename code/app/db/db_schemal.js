var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
  user_name: String,
  email: String,
  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  password: String,
  reset_password: { type: String, default: '' },
  hash_register: String,
  hash_reset: { type: String, default: '' },
  theme:String,
  avatar_id: mongoose.Schema.ObjectId,
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
  user_name: String,
  title: String,
  search_title: String,
  description:String,
  feature_id: mongoose.Schema.ObjectId,
  song_numbers:{ type: Number, default: 0 },
  tags:{ type: [tagSchema] },
  is_public:Boolean,
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

var songSchema = mongoose.Schema({
  user_id: mongoose.Schema.ObjectId,
  title: String,
  position:{ type: Number, default: 0 },
  album_id:mongoose.Schema.ObjectId,
  link:{ type: String, default: '' },
  count_download:{ type: Number, default: 0 },
  created_date:{ type: Date, default: Date.now() },
  status:{ type: String, default: 'actived' }
})

mongoose.model('Song', songSchema)
