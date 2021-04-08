const chai = require('chai'),
    expect = chai.expect

startSim = require('../sim_start_stop/sim_start').startSimulator;
stopSim = require('../sim_start_stop/sim_stop').stopSimulator;

let ex_key = false;

describe('--- Inactive-rfid - 035 ---',function(){

    it('User not able to start the transaction due to inactive rfid',function(done){ 
        startSim(testcase);
        
        this.timeout(80000);
    
        function testcase(child) {
            child.stdout.on('data', (chunk) => {
        
                chunk = chunk.toString();
                console.log(`simulator says: ${chunk}`);
    
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
    
    });

});
