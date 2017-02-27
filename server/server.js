"use strict";

var fs = require('fs');
var sftpServer = require("node-sftp-server");

var server = new sftpServer({
    privateKeyFile: "ssh_host_rsa_key_private",
    // debug: true
});
console.log("server started in port 8022");
server.listen(8022);

server.on("connect", function(auth) {
  console.log("Client attempted to connect");
  if (!(auth.username === "testuser" && auth.password === "Password")) {
    console.log("Authentication failed");
    return auth.reject();
  }
  console.log("Client connected");
  return auth.accept(function(session) {
    return session.on("writefile", function(path, readstream) {
      console.log("Client writing file " + path);
      var writestream = fs.createWriteStream(path);
      readstream.on("end",function() {console.log("Writefile request has come to an end!!!")});
      return readstream.pipe(writestream);
    });
  });
});

server.on("error", function() {
  return console.log("Server encountered an error");
});
server.on("end", function() {
  return console.log("Client disconnected");
});