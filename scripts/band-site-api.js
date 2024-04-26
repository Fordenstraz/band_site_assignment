//Generated API key:
export const apiKey = `a3edc3bb-225f-4181-a224-00587427d2d7`;

export default class BandSiteApi {
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.baseUrl = `https://unit-2-project-api-25c1595833b2.herokuapp.com/`;
	}

	async postComment(comment) {
		try {
			//set header:
			const config = { headers: { 'Content-type': 'application/json' } };
			await axios.post(
				`${this.baseUrl}comments?api_key=${this.apiKey}`,
				config
			);
		} catch (error) {
			console.log(`An error has occurred: `, error);
		}
	}

	async getComments() {
		try {
			const response = await axios.get(
				`${this.baseUrl}comments?api_key=${this.apiKey}`
			);
			//get data from response, sort newest to oldest:
			return response.sort((a, b) => b.timestamp - a.timestamp); //this is an array of comment objects
		} catch (error) {
			console.log(`An error has occurred: `, error);
		}
	}

	async getShows() {
		try {
			const response = await axios.get(
				`${this.baseUrl}showdates?api_key=${this.apiKey}`
			);
			//get data from response:
			response; //this is an array of show objects
		} catch (error) {
			console.log(`An error has occurred: `, error);
		}
	}

	async deleteComment(comment) {
		try {
			await axios.delete(
				`${this.baseUrl}comments?api_key=${this.apiKey}`
			);
		} catch (error) {
			console.log(`An error has occurred: `, error);
		}
	}
}

//Hugo's code:
///<Option 1>
async function getShowsData() {
	const api = new BandSiteApi(API_KEY);
	const newShowDates = await api.getShows();
	return newShowDates;
}

async function renderShows() {
	const newShowDates = await getShowsData();
	newShowDates.forEach(show => {
		//Code to render Shows
	});
}

///Option 2
async function renderShows() {
	const api = new BandSiteApi(API_KEY);
	const newShowDates = await api.getShows();
	newShowDates.forEach(show => {
		//Code to render Shows
	});
}
