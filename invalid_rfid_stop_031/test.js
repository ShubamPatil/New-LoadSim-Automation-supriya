startSim = require('../sim_start_stop/sim_start').startSimulator;
stopSim = require('../sim_start_stop/sim_stop').stopSimulator;

const chai = require('chai');
const expect = chai.expect;

let in_key = false;

describe('-----Test Case - 031-----', function () {
    it('-----Invalid rfid stop case------', function (done) {
        startSim(testcase);
        this.timeout(80000);
        function testcase(child) {
            child.stdout.on('data', (chunk) => {

                chunk = chunk.toString();
                console.log(`simulator says: ${chunk}`);

                if(chunk.includes("Error while authorizing")){

                    in_key = true;
                }
                
                if(in_key === true && chunk.includes("status")){
                   
                        in_key = 'passed';
                        expect(chunk).to.include('Invalid');
                }

                if(in_key === 'passed'){
                    stopSim();
                    done();
                }

                if(chunk.includes("Stopped charging")){

                    stopSim();
                    expect.fail("Failing the case as the charging stopped successfully");
                }
            });

        }

    })
})