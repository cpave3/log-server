/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // Debug
  'GET /': 'BaseController.index',
  'GET /api/v1': 'BaseController.index',

  // Unprotected
  'POST /api/v1/account/register'     : 'UserController.register',
  'POST /api/v1/account/authenticate' : 'UserController.authenticate',

  // Protected
  'GET /api/v1/account' : 'UserController.account',

  // TEAM
  'POST   /api/v1/teams' : 'TeamController.create',
  'GET    /api/v1/teams' : 'TeamController.list',

  'GET    /api/v1/team/:teamId'  : 'TeamController.read',
  'PUT    /api/v1/team/:teamId'  : 'TeamController.update',
  'DELETE /api/v1/teams/:teamId' : 'TeamController.delete',

  'GET /api/v1/projects': 'ProjectController.index',

  'GET /api/v1/records': 'RecordController.index',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
