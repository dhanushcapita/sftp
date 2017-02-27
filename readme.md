
Secure File Transfer Protocol(SFTP) client and server samples using Node js

-   References:  
    -	Server https://www.npmjs.com/package/node-sftp-server https://github.com/BriteVerify/node-sftp-server
    -	Client https://www.npmjs.com/package/sftp-upload 
    -	'ssh-keygen -t rsa' to generate keys 

-   Details:  
    -	'server' folder is the node app for sftp server 
    -	'client' folder is the node app for sftp client
    -   Server authentication is based on username and password (not key based authentication)
    -   Username, password, port etc. are hardcoded in the code itself
    -   'ssh_host_rsa_key_private' and 'ssh_host_rsa_key_public' are the ssh keys. These keys are not using for authentication. But we need a private key to initialize 'node-sftp-server' module 

-   How to test:  
    -	Do the 'npm install' in both client and server apps  
    -	Start the server using 'node server/server.js'
    -	Start the client using 'node client/server.js' 
    -   All the file in the 'client/upload' folder will be uploaded to the 'server/sftpUpload-tmp-01' folder while running the client app