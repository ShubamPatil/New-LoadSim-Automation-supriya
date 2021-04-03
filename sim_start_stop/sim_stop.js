const { spawn } = require('child_process');

module.exports.stopSimulator = function () {
    return new Promise((resolve) => {
        const child = spawn('bash', ['../sim_start_stop/stop-sim.sh']);
        child.stdout.on('data', (chunk) => {
            chunk = chunk.toString();
            console.log(`killing process with PID: ${chunk}`);
        });
    });
}