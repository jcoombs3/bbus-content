const PROJECT_NAME = "bbus-content-app";
const PROXY_CONFIG = {
	"/api/contentservices": {
		"target": "http://0.0.0.0:7777/api/contentservices",
		"secure": false,
		"changeOrigin": true,
		"pathRewrite": {
			"^/api/contentservices": ""
		}
	},
	"/gateway/api/contentservices": {
		"target": "http://0.0.0.0:7777/gateway/api/contentservices",
		"secure": false,
		"changeOrigin": true,
		"pathRewrite": {
			"^/gateway/api/contentservices": ""
		}
	},
	"*": {
    target: "http://0.0.0.0:3003/",
    pathRewrite: (path, req) => {
      console.log("path", path);
      if (path.indexOf("?") < 0) {
        path = path + "?" + "projectName=" + PROJECT_NAME;
      } else {
        path = path + "&" + "projectName=" + PROJECT_NAME;
      }
      return path;
    },
    bypass: (req, res, proxyOptions) => {
      console.log("bypass", req.url);
      if (req.headers.accept.indexOf("text/html") >= 0) {
        return "/index.html";
      }
    },
    secure: false,
    logLevel: "debug",
    changeOrigin: true
  }
}

module.exports = PROXY_CONFIG;