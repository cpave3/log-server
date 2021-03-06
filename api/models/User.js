/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

  transform: async (user) => {
    const obj = {...user}

    // Define the things we want to hide from responses
    const hidden = [
      'password', 'is_super', 'meta'
    ];

    // Remove anything which we don't want to expose via the API
    hidden.forEach((attribute) => {
      delete obj[attribute];
    });

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

  isSuperUser: async (user) => {
    return (
      user.isSuper &&
      user.isSuper === true
    )
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

      isSuper: {
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

