const os = require('os');

const systemInfo = () => {
    return {
        osType: os.type(),
        totalMemory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
        freeMemory: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`,
        cpuDetails: os.cpus().map(cpu => cpu.model).join(', ')
    };
};

module.exports = getsystemInfo;
