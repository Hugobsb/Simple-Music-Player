set NodePackagesPath=echo %cd%

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=production

start "" http://localhost:443

nodemon src/server.js