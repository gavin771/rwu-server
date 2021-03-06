const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
  favoriteCountries:[{
    type: Schema.Types.ObjectId, ref: 'Country',
    favorite: {
      type: Boolean,
      required: true,
      default: false
    }
  }],

});

UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.password;
    delete ret.token;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

UserSchema.plugin(bcrypt), { rounds: 12 };
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

UserSchema.index({ username: 1 });

module.exports = mongoose.model('User', UserSchema);  