const mongoose = require('mongoose');

// const server = 'ds137483.mlab.com:37483';
// const dbName = 'gbc-blogapp-db';
// const user = 'priom-gbc';
// const password = 'priom-gbc1';

// const connectionString = `mongodb://${user}:${password}@${server}/${dbName}`;

const connectionString = "mongodb://localhost/blogapp"

const connect = () => {
	mongoose.connect(connectionString)
		.then(() => { console.log(`Connected to mongodb at : ${connectionString}`)})
		.catch(err => { console.log(err)});
};

module.exports = connect;

