var serialPortLibrary = require("serialport");
var serialPortConstructor = require("serialport").SerialPort;
var events = require("events");
var util = require('util');
var Communication = require('./communication')
var MessageGenerator = require('./messageGenerator');


function Glove() {

	this.ANALOG_READ_COMMAND = "Analog Read";
	this.DIGITAL_READ_COMMAND = "Digital Read";

	this.readQueue =[];

	this.communication = new Communication();
	this.messageGenerator = new MessageGenerator();

}

Glove.prototype = new events.EventEmitter;

Glove.prototype.openPort = function(portName, baudRate) {

	this.communication.openPort(portName,baudRate);
}

Glove.prototype.closePort = function() {

	this.communication.closePort();
}

Glove.prototype.getPortNames = function() {

	this.communication.getPortNames();
}

Glove.prototype.initializeMotor = function(pins) {

	var message = this.messageGenerator.initializeMotor(pins);
	this.communication.write(message);
}

Glove.prototype.activateMotor = function(pins, values) {

	var message = this.messageGenerator.activateMotor(pins,values);
	this.communication.write(message);
}

Glove.prototype.analogRead = function(pin) {

	var message = this.messageGenerator.analogRead(pin);
	var readObject = {

		pin: pin,
		command : this.ANALOG_READ_COMMAND
	}
	
	this.communication.write(message); 
	this.readQueue.push(readObject);
}

Glove.prototype.digitalRead = function() {

	var message = this.messageGenerator.digitalRead(pin);
	var readObject = {

		pin: pin,
		command : this.ANALOG_READ_COMMAND
	}
	
	this.communication.write(message);
	this.readQueue.push(readObject);
}

Glove.prototype.pinMode = function(pins, modes) {

	var message = this.messageGenerator.pinMode(pins, modes);
	this.communication.write(message);
}

Glove.prototype.digitalWrite = function(pins, values) {

	var message = this.messageGenerator.digitalWrite(pins, values);
	this.communication.write(message);
}

Glove.prototype.analogWrite = function(pins, values) {

	var message = this.messageGenerator.analogWrite(pins,values);
	this.communication.write(message);
}

Glove.prototype.communication.on('data', function(data){

	var readObject = this.readQueue.shift();

	readObject.value = data;
	this.emit('data', readObject);

});

module.exports = Glove;

