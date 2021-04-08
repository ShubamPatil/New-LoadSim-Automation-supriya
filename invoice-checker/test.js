startSim = require('../sim_start_stop/sim_start').startSimulator;
stopSim = require('../sim_start_stop/sim_stop').stopSimulator;

CheckInvoice = require('./invoice').checkInvoiceGenerated;
const chai = require('chai');
const expect = chai.expect;

returnTime = require('./time').timereturn;
startTrans = require('../remote_start_stop/remote_start').triggerRemoteStart;
stopTrans = require('../remote_start_stop/remote_stop').triggerRemoteStop;

const startDatetime = new Date();
const connectorId = 1;
const rfidTag = "SUPRFID123";
const chargePoint = "Testcharge001";
let t_flag = true;
let trans = "";
let end = false;

describe('-----Invoice Checker-----', function () {
    it('---Invoice generation and verification--', function (done) {
        startSim(testcase);
        this.timeout(100000);
        function testcase(child) {
            child.stdout.on('data', (chunk) => {

                chunk = chunk.toString();
                console.log(`simulator says: ${chunk}`);

                if (chunk.includes(`Waiting for Remote Start`)) {
                    startTrans(connectorId, rfidTag, chargePoint);
                }

                if (chunk.includes("transactionId") && t_flag === true) {
                    trans = chunk.split("transactionId: ")[1].split(" }")[0];
                    t_flag = false;
                }

                if (chunk.includes(`Waiting for Remote Stop`)) {
                    stopTrans(chargePoint, trans);
                }

                if (chunk.includes("Stopped charging")) {
                    const endDatetime = new Date();
                    CheckInvoice(startDatetime, endDatetime, function (trans_invoice) {
                        //end = true;
                        console.log(trans, trans_invoice);
                        try {
                            expect(trans).to.equal(trans_invoice);
                            done();
                            stopSim();
                        }
                        catch (err) {
                            end = false;
                            done(err);
                            stopSim();
                        }
                    });
                }
            });
        }
    });
});