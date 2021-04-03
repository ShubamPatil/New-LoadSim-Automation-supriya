const supertest = require('supertest')
const request = supertest('https://testcms1.numocity.com:9091/api/v2/ocpp/remotetransaction/');

module.exports.triggerRemoteStart = function (connectorId, rfidTag, chargePoint) {

    const load = {
        "connectorId": connectorId,
        "idTag": rfidTag
    };

    request.post(`start/${chargePoint}`).send(load)
        .then(res => {
            //console.log(res.body);
            expect(res.body).to.not.be.empty;
            expect(res.body.status).to.be.eq('Success');
        });

};
