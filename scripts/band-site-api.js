//API URL: https://unit-2-project-api-25c1595833b2.herokuapp.com/
//append to each request: ?api_key=c9a423a5-d6b3-47e5-a040-1358b3059193

// AUTHENTICATION: To register with the API and get a key, make a GET request to /register.
// You can do this with the browser and you only need to do it once. Store the key in a global variable in your website.
// You must append ?api_key=<your_api_key_here> to each of your API request URLs (except for /register).

class BandSiteApi {
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = `https://unit-2-project-api-25c1595833b2.herokuapp.com/`;
	}

	postComment(comment) {
		await;
	}

	getComments() {
		await;
	}

	getShows() {
		await;
	}

	deleteComment(comment) {
		await;
	}
}
