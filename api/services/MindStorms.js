var Ev3 = require('ev3-nodejs-bt');
var Ev3_base = Ev3.base;
var robot = new Ev3_base("/dev/tty.EV3-SerialPort");

var motor_on_focus = "a";
var motor_output = {"a": 0, "b":0,"c":0, "d":0};
var target = null;

module.exports = {
  connect: function(cb) {
    robot.connect(function() {
      robot.start_program(function(t) {
        target = t;
        var output = target.getOutputSequence(motor_output["a"],motor_output["b"],motor_output["c"],motor_output["d"]);
        target.sp.write(output,function(){});
        console.log(motor_on_focus + " motor output:" + motor_output[motor_on_focus] +"\n");
        setTimeout(cb, 5000);
      })
    });
  },

  motor: function(id, time, power, cb) {
    cb();
    motor_output[id] = power;
    var output = target.getOutputSequence(motor_output["a"],motor_output["b"],motor_output["c"],motor_output["d"]);
    target.sp.write(output,function(){});
    console.log(id + " motor output:" + motor_output[id] +"\n");
    setTimeout(function() {
      var output = target.getOutputSequence(motor_output["a"],motor_output["b"],motor_output["c"],motor_output["d"]);
      motor_output[id] = 0;
      target.sp.write(output,function(){});
      console.log(id + " motor output:" + motor_output[id] +"\n");
    }, time);
  }
};