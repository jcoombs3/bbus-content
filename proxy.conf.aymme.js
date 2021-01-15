const PROXY_CONFIG = {
	"/api": {
		"target": "http://0.0.0.0:7777/api",
		"secure": false,
		"changeOrigin": true,
		"pathRewrite": {
			"^/api": ""
		}
	},
	"/gateway/api": {
		"target": "http://0.0.0.0:7777/gateway/api",
		"secure": false,
		"changeOrigin": true,
		"pathRewrite": {
			"^/api": ""
		}
	}
}

module.exports = PROXY_CONFIG;