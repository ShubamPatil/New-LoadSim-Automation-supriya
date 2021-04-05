startSim = require('../sim_start_stop/sim_start').startSimulator;
stopSim = require('../sim_start_stop/sim_stop').stopSimulator;

const chai = require('chai');
const expect = chai.expect;

startTrans = require('../remote_start_stop/remote_start').triggerRemoteStart;
stopTrans = require('../remote_start_stop/remote_stop').triggerRemoteStop;

const connectorId = require('./variables').connectorId;
const rfidTag = require('./variables').rfidTag;
const chargePoint = require('./variables').chargePoint;

let ex_key = false;

describe('-----Test Case - 011-----', function () {
    it('-----Invalid stop case------', function (done) {
        startSim(testcase);
        this.timeout(80000);
        function testcase(child) {
            child.stdout.on('data', (chunk) => {

                chunk = chunk.toString();
                console.log(`simulator says: ${chunk}`);

                if (chunk.includes(`Waiting for Remote Start for ${chargePoint}'s Connector ${connectorId.toString()}`)) {
                    startTrans(connectorId, rfidTag, chargePoint);
                }

                if(chunk.includes(`Error when starting charging for ${chargePoint}'s connector ${connectorId.toString()}`)){

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

                if(chunk.includes(`Waiting for Remote Stop for ${chargePoint}'s Connector ${connectorId.toString()}`)){

                    stopSim();
                    expect(chunk).to.include('Expired');
                  
                }
            });

        }

    })
})