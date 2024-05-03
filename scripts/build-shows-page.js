//////////////////////
/////DECLARATIONS/////
/////////////////////

//Get BandSiteApi:
import BandSiteApi, { apiKey } from './band-site-api.js';
const showListingsApi = new BandSiteApi(apiKey);

//refer to 'shows section':
const showsSection = document.querySelector('.shows');

//Months of the year (for timestamp):
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

///////////////////
/////FUNCTIONS/////
//////////////////

//Get upcoming show data from API:
const getShowData = async () => {
	const showListingData = await showListingsApi.getShows();
	return showListingData;
}

//Format timestamps from epoch to 'day, month, date, year':
const formatTimestampToDate = timestamp => {

	//create date from timestamp:
    const eventDate = new Date(timestamp);

    const day = eventDate.toLocaleString('en-US', { weekday: 'short', timeZone: 'UTC' });
    const month = months[eventDate.getMonth()];
	const date = ('0' + eventDate.getUTCDate()).slice(-2);
    const year = eventDate.getFullYear();

    return `${day} ${month} ${date} ${year}`;
};

//Function to create parts of a show listing:
const createMobileShowInfo = (label, data) => {
	//create wrapper:
	const wrapper = document.createElement('div');
	wrapper.classList.add('listing__wrapper');

	//create heading:
	const heading = document.createElement('h3');
	heading.classList.add('listing__header');
	heading.innerText = label;

	//identify as date or place, add value:
	const value = document.createElement('p');
	if (label === 'DATE') {
		value.classList.add('listing__date');
	} else {
		value.classList.add('listing__place');
	}
	value.innerText = data;

	//put content into wrapper and return:
	wrapper.append(heading);
	wrapper.append(value);
	return wrapper;
};

//Function to create tablet/desktop show info:
const createShowInfo = (label, data) => {
	//identify as date or place, add value, return:
	const value = document.createElement('p');
	if (label === 'DATE') {
		value.classList.add('listing__wrapper', 'listing__date');
	} else {
		value.classList.add('listing__wrapper', 'listing__place');
	}
	value.innerText = data;
	return value;
};

//create just headings:
const createShowHeadings = label => {
	const heading = document.createElement('p');
	heading.classList.add('listing__header');
	heading.innerText = label;

	return heading;
};

//Build mobile shows page:
const buildMobileShowsSection = array => {
	//add the heading:
	const showsHeading = document.createElement('h2');
	showsHeading.classList.add('shows__header');
	showsHeading.innerText = 'Shows';
	showsSection.append(showsHeading);

	//create listings container:
	const container = document.createElement('div');
	container.classList.add('shows__container');

	//generate show listings:
	for (let show of array) {
		//create div to hold listing content:
		const listing = document.createElement('div');
		listing.classList.add('shows__listing');

		//run function to create listing parts:
		listing.append(createMobileShowInfo('DATE', formatTimestampToDate(show.date)));
		listing.append(createMobileShowInfo('VENUE', show.place));
		listing.append(createMobileShowInfo('LOCATION', show.location));

		//create and add the CTA button:
		const ctaButton = document.createElement('button');
		ctaButton.classList.add('cta-button');
		ctaButton.innerText = 'BUY TICKETS';
		listing.append(ctaButton);

		//add listing to container:
		container.append(listing);
	}

	//add container to the shows section:
	showsSection.append(container);
};

//Build tablet/desktop shows page:
const buildShowsSection = array => {
	//add the header:
	const showsHeading = document.createElement('h2');
	showsHeading.classList.add('shows__header');
	showsHeading.innerText = 'Shows';
	showsSection.append(showsHeading);

	//create listings container:
	const container = document.createElement('div');
	container.classList.add('shows__container');

	//create heading row:
	const headingRow = document.createElement('div');
	headingRow.classList.add('shows__headers-row');

	//create headings:
	headingRow.append(createShowHeadings('DATE'));
	headingRow.append(createShowHeadings('VENUE'));
	headingRow.append(createShowHeadings('LOCATION'));

	//add spacer:
	const spacer = document.createElement('div');
	spacer.classList.add('listing__header');
	headingRow.append(spacer);

	//add headings to container:
	container.append(headingRow);

	//generate show listings:
	for (let show of array) {
		//create div to hold listing content:
		const listing = document.createElement('div');
		listing.classList.add('shows__listing');

		//create listing elements:
		listing.append(createShowInfo('DATE', formatTimestampToDate(show.date)));
		listing.append(createShowInfo('VENUE', show.place));
		listing.append(createShowInfo('LOCATION', show.location));

		//button:
		const button = document.createElement('button');
		button.classList.add('cta-button');
		button.innerText = 'BUY TICKETS';
		listing.append(button);

		//add listing to container:
		container.append(listing);
	}
	//add the container of listings to the page:
	showsSection.append(container);
};

//Check window size and run appropriate function:
const windowCheck = () => {
	if (window.innerWidth < 768) {
		buildMobileShowsSection(upcomingShows);
	} else {
		buildShowsSection(upcomingShows);
	}
};

//Create event listener for show-selected state:
const createSelectionTracker = () => {
	//identify listings:
	const showListings = document.querySelectorAll('.shows__listing');

	//add selection tracker:
	showListings.forEach(listing => {
		listing.addEventListener('click', () => {
			//remove selected state from previous selection:
			const previousSelection = document.querySelector(
				'.shows__listing--selected'
			);
			if (previousSelection) {
				previousSelection.classList.remove('shows__listing--selected');
			}
			//apply state to new selection:
			listing.classList.add('shows__listing--selected');
		});
	});
};

//Check window size and run appropriate function:
const windowCheck = async () => {
	//API call for show data:
	const showData = await getShowData();
	//Check window:
	if (window.innerWidth < 768) {
		clearSection(showsSection);
		buildMobileShowsSection(showData);
	} else {
		clearSection(showsSection);
		buildShowsSection(showData);
		createSelectionTracker();
	}
};

//Clear shows section:
const clearSection = section => {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
};

///////////////////////
/////PAGE HANDLING/////
///////////////////////

//Check window size, and call API for show listings:
windowCheck();

//Catch window resizes, and apply new function if necessary:
window.addEventListener('resize', () => {
	windowCheck()
});
