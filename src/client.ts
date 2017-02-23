'use strict';
import ip = require('ip');

//make the client
const net = require('net'),
    readline = require('readline'),
    client = new net.Socket(),
    io = readline.createInterface(process.stdin, process.stdout);
    

client.on('data', function(data) { //when we get data
       console.log("We received your data: "+data + '\n');
});

client.on('close', function() { //when connection closed
    console.log('We are disconnecting the server');
    console.log('The client is being closed');
    exit(0);
});


var HOST = ip.address();
var PORT = 3000;

//connect to the server
client.connect(PORT, HOST, function() {
    console.log('connected to ' + HOST +  ":" + PORT);
    
    io.setPrompt('input>');

    io.prompt();

    io.onclose('close', function() {
        client.end();
        console.log('client disconnecting');
        exit(0);
    });
});




