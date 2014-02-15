/**
 * MotorController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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

  control: function(req, res) {
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

    MindStorms.motor(motor_id, time, power, function() {
      console.log('process done');
    });

    res.send({
      status: 202
    });
  }
};
