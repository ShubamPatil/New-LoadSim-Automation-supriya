startSim = require('../sim_start_stop/sim_start').startSimulator;
stopSim = require('../sim_start_stop/sim_stop').stopSimulator;

const chai = require('chai');
const expect = chai.expect;

startTrans = require('../remote_start_stop/remote_start').triggerRemoteStart;
stopTrans = require('../remote_start_stop/remote_stop').triggerRemoteStop;

const connectorId = 3;
const rfidTag = "SUPRFID123";
const chargePoint = "Testcharge001";

let ex_key = false;

describe('-----Test Case - 011-----', function () {
    it('-----Invalid stop case------', function (done) {
        startSim(testcase);
        this.timeout(80000);
        function testcase(child) {
            child.stdout.on('data', (chunk) => {

                chunk = chunk.toString();
                console.log(`simulator says: ${chunk}`);

                if (chunk.includes("Waiting for Remote Start")) {
                    startTrans(connectorId, rfidTag, chargePoint);
                }

                if(chunk.includes("Error when starting charging")){

                    ex_key = true;
                }
                
                if(ex_key === true && chunk.includes("status")){
                   
                        ex_key = 'passed';
                        expect(chunk).to.include('Expired');
                }

                if(ex_key === 'passed'){
                    stopSim();
                    done();
                }

                if(chunk.includes("Starting charging")){

                    stopSim();
                    expect.fail("Failing the case as the charging started");
                }
            });

        }

    })
})