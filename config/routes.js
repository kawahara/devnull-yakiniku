/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.routes = {
  'POST /motor/furikaburu' : {
    'controller' : 'MotorController',
    'action': 'furikaburu'
  },
  'POST /motor/up_i' : {
    'controller' : 'MotorController',
    'action': 'up_i'
  },
  'POST /motor/abeshi' : {
    'controller' : 'MotorController',
    'action': 'abeshi'
  },
  'POST /motor/:id' : {
    'controller' : 'MotorController',
    'action': 'control'
  }
};
