const supertest = require('supertest')
const request = supertest('https://testcms1.numocity.com:9091/api/v2/ocpp/remotetransaction/');

module.exports.triggerRemoteStop = function (chargePoint, trans) {
    //console.log(trans, chargePoint);
    request.get(`stop/${chargePoint}/${trans}`)
        .then(res => {
            expect(res.body).to.not.be.empty;
            expect(res.body.status).to.be.eq('Success');
        });
};
