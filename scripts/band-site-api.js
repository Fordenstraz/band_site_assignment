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
				comment,
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
			//get array of comment objects from response, sort newest to oldest:
			return response.data.sort((a, b) => b.timestamp - a.timestamp);

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
			return response.data;
		} catch (error) {
			console.log(`An error has occurred: `, error);
		}
	}
}