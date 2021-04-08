const supertest = require('supertest')
const request = supertest('https://testcms1.numocity.com:4003/');

const getDate = require('./time').timereturn;

let trans_id = ""
module.exports.checkInvoiceGenerated = function (startDatetime, endDatetime, Callback) {
    getDate(startDatetime, function (week, month, year, date) {
        const req = `transaction/get/v1?fromDate=${week}%20${month}%20${date}%20${year}%2001:01:01%20GMT+0530%20(India%20Standard%20Time)&toDate=${week}%20${month}%20${date}%20${year}%2023:59:59%20GMT+0530%20(India%20Standard%20Time)`;
        //Invalid test
        //const req = 'transaction/get/v1?fromDate=Mon%20Apr%2005%202021%2001:01:01%20GMT+0530%20(India%20Standard%20Time)&toDate=Mon%20Apr%2005%202021%2023:59:59%20GMT+0530%20(India%20Standard%20Time)';
        request.get(req)
            .then(res => {
                console.log(`got ${res.body.Document.length} total sessions`);
                const todaysSession = res.body.Document.filter((session) => {
                    return endDatetime > startDatetime && session.CPID.startsWith('Testcharge001');
                });
                console.log(`${todaysSession.length} of them are for Testcharge001`);
                const ActTransID = todaysSession[0].TransactionID;
                const ActTID = ActTransID.toString();

                trans_id = ActTID;
                Callback(trans_id);
            })

    });
}
