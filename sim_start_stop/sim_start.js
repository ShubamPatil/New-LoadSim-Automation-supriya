const { spawn } = require('child_process');

module.exports.startSimulator = function (testcase) {
    return new Promise((resolve) => {
        const child = spawn('bash', ['../sim_start_stop/start-sim.sh']);
        testcase(child);
    });
}