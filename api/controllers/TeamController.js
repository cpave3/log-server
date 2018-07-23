/**
 * TeamControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    index: (req, res) => {
        // TODO: this
        return res.status(200).json({controller: 'team'});
    },

};

