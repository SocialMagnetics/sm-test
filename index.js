'use strict';

const process = require('process');

const remoteRequire = require('../sm-remoting')({ timeout: 2000 });

const co = require('co');

co(function*() {
    console.log('Getting instance of the service');
    
    // TODO: replace with machine name - need a better way to do this!
    const service = yield remoteRequire('/service/machines/{machine-name}');

    console.log('\nmanifest:\n  name:       ', yield service.manifest.name);
    console.log('  description:', yield service.manifest.description);
    console.log('  version:    ', yield service.manifest.version);
    
    console.log(yield service.getArchitecture());
    console.log(yield service.getCpus());
    console.log(yield service.getEndian());
    console.log(yield service.getFreeMemory());
    console.log(yield service.getHostName());
    console.log(yield service.getAverageLoad());
    console.log(yield service.getNetworkInterfaces());
    console.log(yield service.getPlatform());
    console.log(yield service.getRelease());
    console.log(yield service.getTotalMemory());
    console.log(yield service.getType());
    console.log(yield service.getUpTime());

    service.transport.end();
}).then(null, err => {
    console.error(err);
    process.exit();
});
