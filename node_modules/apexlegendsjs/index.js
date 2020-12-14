const apexAPIURL = "public-api.tracker.gg";
const https = require("https");

function apexjs(code) {
	const apiKey = code;

	/**
 	* Returns core profile information
 	* @param {("origin"|"xbl"|"psn")} platform - The target platform 
	* @param {string} username - The target username.
 	*/
	function profile(username, platform) {
		checkInput([
			{ name: "Username", type: "string", value: username },
			{ name: "Platform", type: "string", value: platform }
		]);
		const path = "/v2/apex/standard/profile/" + platform + "/" + username;
		return sendAPI(path, apiKey)

	}
	/**
 	* Get information on a user's segments
 	* @param {("origin"|"xbl"|"psn")} platform - The target platform 
	* @param {string} username - The target username.
	* @param {("legend"|"others")} segmentType - The type of data attribute.
 	*/
	function playerSegments(username, platform, segmentType) {
		checkInput([
			{ name: "Username", type: "string", value: username },
			{ name: "Platform", type: "string", value: platform },
			{ name: "Segment Type", type: "string", value: segmentType }
		]);
		const path = "/v2/apex/standard/profile/" + platform + "/" + username + "/segments/" + segmentType;
		return sendAPI(path, apiKey)
	}
	/**
 	* Search for a user
 	* @param {("origin"|"xbl"|"psn")} platform - The target platform 
 	* @param {string} query - Search parameter.
 	*/
	function search(platform, query) {
		checkInput([
			{ name: "Platform", type: "string", value: platform },
			{ name: "Query", type: "string", value: query }
		]);
		const path = "/v2/apex/standard/search/?platform=" + platform + "&query=" + query
		return sendAPI(path, apiKey)
	}
	/**
 	* Returns information about a users session
 	* @param {("origin"|"xbl"|"psn")} platform - The target platform 
	* @param {string} username - The target username.
 	*/
	function playerSessions(username, platform) {
		checkInput([
			{ name: "Platform", type: "string", value: platform },
			{ name: "Username", type: "string", value: username }
		]);
		const path = "/v2/apex/standard/profile/" + platform + "/" + username
		return sendAPI(path, apiKey)
	}
	return { profile, playerSegments, search, playerSessions };
}


function sendAPI(path, apiKey) {

	return new Promise((resolve, reject) => {

		const options = {
			host: apexAPIURL,
			port: 443,
			method: "GET",
			path: path,
			headers: {
				"Content-Type": "application/json",
				"TRN-Api-Key": apiKey
			}
		};
		const req = https.request(options, res => {
			let body = "";
			res.on("data", function (chunk) {
				body += chunk;
			});
			res.on("end", () => {
				body = JSON.parse(body);
				resolve(body.data)
			});
		});
		req.on("error", error => {
			console.error(error);
			reject(error)
		});
		req.end();
	})

}
function checkInput(inputs) {
	for (const input of inputs) {
		if (typeof input.value !== input.type)
			throw TypeError(input.name + " must be a " + input.type);
		if (input.name === "Platform") {
			if (!["origin", "xbl", "psn"].includes(input.value))
				throw TypeError(input.name + " must be equal to ['origin', 'xbl', 'psn'], you provided: " + input.value);
		}
	}
}
module.exports = apexjs;
