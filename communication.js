var serialPortLibrary = require("serialport");
var serialPortConstructor = require("serialport").SerialPort;
var events = require("events");
var util = require('util');


function Communication() {
	
	this.serialPort;

}	

Communication.prototype = new events.EventEmitter;

Communication.prototype.openPort = function(portName, baudRate) {
    
	this.serialPort = new serialPortConstructor(portName, {
			baudRate: baudrate,
			parser: serialport.parsers.readline("\n")
	}, true);

};

Communication.prototype.getPortNames = function() {
    
	serialPortConstructor.list(function (err, ports) {

		var portNames = [];
		if (!err) {
			ports.forEach(function(port) {
				portNames.push(port.comName);	
		}

		return portNames;			
		});
};

Communication.prototype.write = function(data) {

	this.serialPort.write(data);

	});
	
};

Communication.prototype.closePort = function() {
	
	this.serialPort.close();
};

Communication.prototype.serialPort.on('data', function(data){

	this.emit('data', data);

});

module.exports = Communication;
