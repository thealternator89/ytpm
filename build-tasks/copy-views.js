var copyfiles = require('copyfiles');

copyfiles(['views/**/*', 'dist'], 0, () => undefined);
copyfiles(['src/server/data/discovery/*', 'dist/data/discovery'], -1, () => undefined);