startSim = require('../sim_start_stop/sim_start').startSimulator;
stopSim = require('../sim_start_stop/sim_stop').stopSimulator;

const chai = require('chai');
const expect = chai.expect;

startTrans = require('../remote_start_stop/remote_start').triggerRemoteStart;
stopTrans = require('../remote_start_stop/remote_stop').triggerRemoteStop;

const connectorId = 3;
const rfidTag = "SUPRFID123";
const chargePoint = "Testcharge001";

let t_flag = true;
let trans = "";
let count_start = false;
let count = 2;
let don_val = false;

describe('-----Test Case - 002-----', function () {
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

                if (chunk.includes("transactionId") && t_flag === true) {
                    trans = chunk.split("transactionId: ")[1].split(" }")[0];
                    t_flag = false;
                }

                if (chunk.includes("Waiting for Remote Stop")) {
                    count_start = true;
                    stopTrans(chargePoint, trans); // Giving invalid Transaction Id for Remote Stop
                }

                if (count >= 0 && count_start === true) {
                    if ((chunk.includes("transactionId"))) {
                       
                        count_start = false;
                        stopSim();
                        expect.fail("Case failing as remote stop happened successfully");
                    }
                    else {
                        count -= 1
                    }
                }
                else if (count < 0 && count_start === true) {
                    console.log("\n\nRemote stop transaction is unsuccessful...\n So charging cannot be stopped... \n\n");
                    don_val = true;
                    expect(chunk).to.not.include("transactionId");
                }

                if (don_val === true) {
                    stopSim();
                    done();
                }
                
            });

        }

    })
})