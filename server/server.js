"use strict";

var fs = require('fs');
var sftpServer = require("node-sftp-server");

var server = new sftpServer({
    privateKeyFile: "ssh_host_rsa_key_private",
    // debug: true
});
console.warn("server started in port 8022");
server.listen(8022);

server.on("connect", function(auth) {
  console.warn("Client attempted to connect");
  if (!(auth.username === "testuser" && auth.password === "Password")) {
    console.warn("Authentication failed");
    return auth.reject();
  }
  console.warn("Client connected");
  return auth.accept(function(session) {
    return session.on("writefile", function(path, readstream) {
      console.warn("Client writing file");
      var writestream = fs.createWriteStream("temp/upoload.txt");
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