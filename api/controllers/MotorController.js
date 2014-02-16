/**
 * MotorController
 *
 * @module      :: Controller
 * @description  :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MotorController)
   */
  _config: {},

  furikaburu: function (req, res) {
    res.isJson = true;

    MindStorms.motor('a', 5000, 25, function () {
      MindStorms.motor('b', 5000, -20, function () {
        MindStorms.motor('c', 10000, -10, function () {

        });
      });
    });

    res.statusCode = 202;
    res.send({
      status: 202
    });
  },

  up_i: function (req, res) {
    res.isJson = true;
    MindStorms.motor('c', 2000, -10, function () {
      MindStorms.motor('b', 2000, -15, function () {
      });
    });

    res.statusCode = 202;
    res.send({
      status: 202
    });
  },

  abeshi: function (res, res) {
    res.isJson = true;
    MindStorms.motor('c', 5000, -4);
    MindStorms.motor('a', 500, 5, function () {
      setTimeout(function () {
        MindStorms.motor('b', 500, 10);
        MindStorms.motor('a', 500, -10, function () {
          setTimeout(function () {
            MindStorms.motor('a', 2000, 10);
            MindStorms.motor('b', 2000, -10);
          }, 1500);
        });
      }, 500);
    });

    res.statusCode = 202;
    res.send({
      status: 202
    });
  },

  control: function (req, res) {
    res.isJson = true;

    var correct_id = ['a', 'b', 'c', 'd'];
    var motor_id = req.param('id');
    var time = req.param('time');
    var power = req.param('power');

    if (!(motor_id && time && power)) {
      res.badRequest(['id, time and power is required']);

      return;
    }

    if (correct_id.indexOf(motor_id) === -1) {
      res.badRequest(['invalid id']);

      return;
    }

    time = parseInt(time);
    power = parseInt(power);


    if (!(time > 0 && time <= 5000)) {
      res.badRequest(['time need to set 0 - 5000']);

      return;
    }

    if (!(power >= -100 && power <= 100)) {
      res.badRequest(['power need to set -100 - 100']);

      return;
    }

    MindStorms.motor(motor_id, time, power, function () {
      console.log('process done');
    });

    res.statusCode = 202;
    res.send({
      status: 202
    });
  }
};
