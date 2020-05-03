var copyfiles = require('copyfiles');

copyfiles(['views/**/*', 'dist'], 0, () => undefined);
copyfiles(['src/data/discovery/*', 'dist/data/discovery'], -1, () => undefined);