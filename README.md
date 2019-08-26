# site-ai-portal

## Create .env File 
Create a .env file in the root directory (site-ai-portal). It should contain this:

```
NODE_ENV=development

# Node.js server configuration
SERVER_PORT=8080

```

This application will run on port 8080. This can be configured by changing the SERVER_PORT configuration in the file above.


## Install node packages
Run `npm i` to install all node dependencies.

## Start server
Run `npm run dev` to start the dev server. The server should start on port:8080.
Navigate to localhost:8080/search to reach the main search page.

## Troubleshooting
Issues during build may be related to node dependencies not installing correctly. During one build there were large amounts of errors involving a module "@babel/runtime".

To fix simply run `npm i @babel/runtime`. Replace @babel/runtime with any packages that are giving errors.
