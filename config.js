var config = {
	port: process.env.PORT || 2000,
	db: process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/meteor"
}
module.exports = config;
