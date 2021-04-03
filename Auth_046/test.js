const chai = require('chai'),
    expect = chai.expect

startSim = require('../sim_start_stop/sim_start').startSimulator;
stopSim = require('../sim_start_stop/sim_stop').stopSimulator;

const connectorId = require('./variables').connectorId;
const chargePoint = require('./variables').chargePoint;

describe('--- Authorise - 046 ---',function(){

    it('User able to stop an RFID session by tapping valid rfid',function(done){ 
        startSim(testcase);
        
        this.timeout(80000);
    
        function testcase(child) {
            child.stdout.on('data', (chunk) => {
        
                chunk = chunk.toString();
                console.log(`simulator says: ${chunk}`);
    
                    if (chunk.includes(`Stopped charging for ${chargePoint}'s connector ${connectorId.toString()}`)) {
                        stopSim();
                        done();                   
                    }
            });
        }
    
    });

});


//module.exports.testcase = testcase;