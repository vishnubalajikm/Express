var config = {
	port: process.env.PORT || 2000,
	db: "mongodb://cskmanager:cskmanager@ds011482.mlab.com:11482/cskmanager" || "mongodb://127.0.0.1:27017/meteor"
}
module.exports = config;
