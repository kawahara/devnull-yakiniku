/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
  MindStorms.connect(function() {
    console.log('hogehoge');
    MindStorms.motor('a', 500, 10, function() {
      cb();
    })
  });
};