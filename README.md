# HTTPS NodeJS MongoDB GraphQL Demo Server

Don't forget to run `yarn` to install the dependencies. [website](https://yarnpkg.com).

self-signed SSL certificate is generated from the server.key and server.crt files which are gitignored and must be generated and placed in the https folder*

Run the development server using `nodemon src`

generating .pem for https in dev environment
[reference](https://devcenter.heroku.com/articles/ssl-certificate-self).
cat server.crt server.key > key.pem
