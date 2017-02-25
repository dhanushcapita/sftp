var sftp = require('sftp-upload'),
fs = require('fs');

var options = {
    host:'localhost',
    port:'8022',
    username:'testuser',
    password:'Password',
    path: 'upload'
},
sftpUpload = new sftp(options);

sftpUpload.on('error', function(err){
    throw err;
})
.on('uploading', function(pgs){
    console.log('Uploading', pgs.file);
    console.log(pgs.percent+'% completed');
})
.on('completed', function(){
    console.log('Upload Completed');
})
.upload();