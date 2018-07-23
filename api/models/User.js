/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

  customToJSON: async (user) => {
    const obj = {...user};
    delete obj.password;
    return obj;
  },

  beforeCreate: (values, callback) => {
    bcrypt.hash(values.password, 10, (err, hash) => {
      if (err) return cb(err);
      values.password = hash;
      callback();
    });
  },

  comparePassword: async (password, user) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) reject(err);
        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  },

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    
      email: {
        type: 'string',
        required: true,
        unique: true,
      },

      password: {
        type: 'string',
        minLength: 6,
        required: true,
        columnName: 'encryptedPassword'
      },

      is_super: {
        type: 'boolean',
        defaultsTo: false,
        allowNull: false,
      },

      meta: {
        type: 'json',
        required: false
      },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    teams: {
      collection: 'team',
      via: 'users'
    },

  },

};

