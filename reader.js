const csv = require('csvtojson');

module.exports = {
	readCsvFile(csvFilePath) {
		return new Promise(resolve => {
			csv().
				fromFile(csvFilePath).
				then(jsonArrayObj => {
					resolve(jsonArrayObj);
				});
		});
	}
};


