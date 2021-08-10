let static_files = require("rollup-plugin-static-files");

module.exports = {
	rollup(config) {
		config.plugins.push(
			static_files({
				include: ["./src/static"],
			})
		);
		return config;
	},
};
