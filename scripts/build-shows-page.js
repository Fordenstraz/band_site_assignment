//ARRAY OF SHOW OBJECTS:
const upcomingShows = [
	{
		date: 'Mon Sept 09 2024',
		venue: 'Ronald Lane',
		location: 'San Francisco, CA',
	},
	{
		date: 'Tue Sept 17 2024',
		venue: 'Pier 3 East ',
		location: 'San Francisco, CA',
	},
	{
		date: 'Sat Oct 12 2024 ',
		venue: 'View Lounge',
		location: 'San Francisco, CA',
	},
	{
		date: 'Sat Nov 16 2024',
		venue: 'Hyatt Agency',
		location: 'San Francisco, CA',
	},
	{
		date: 'Fri Nov 29 2024',
		venue: 'Moscow Center',
		location: 'San Francisco, CA',
	},
	{
		date: 'Wed Dec 18 2024 ',
		venue: 'Press Club',
		location: 'San Francisco, CA',
	},
];

const buildMobileShowsSection = array => {
	const container = document.querySelector('.shows__container');

	for (let show of array) {
		//create div to hold listing content:
		const listing = document.createElement('article');
		listing.classList.add('shows__listing');

		//create the date content:
		const dateHeading = document.createElement('h3');
		dateHeading.innerText = 'DATE';
		dateHeading.classList.add('listing__header');

		const dateData = document.createElement('p');
		dateData.innerText = show.date;
		dateData.classList.add('listing__date');

		const dateWrapper = document.createElement('div');
		dateWrapper.classList.add('listing__wrapper');
		dateWrapper.append(dateHeading);
		dateWrapper.append(dateData);

		//create the venue content:
		const venueHeading = document.createElement('h3');
		venueHeading.innerText = 'VENUE';
		venueHeading.classList.add('listing__header');

		const venueData = document.createElement('p');
		venueData.innerText = show.venue;
		venueData.classList.add('listing__place');

		const venueWrapper = document.createElement('div');
		venueWrapper.classList.add('listing__wrapper');
		venueWrapper.append(venueHeading);
		venueWrapper.append(venueData);

		//create the location content:
		const locationHeading = document.createElement('h3');
		locationHeading.innerText = 'LOCATION';
		locationHeading.classList.add('listing__header');

		const locationData = document.createElement('p');
		locationData.innerText = show.location;
		locationData.classList.add('listing__place');

		const locationWrapper = document.createElement('div');
		locationWrapper.classList.add('listing__wrapper');
		locationWrapper.append(locationHeading);
		locationWrapper.append(locationData);

		//create the CTA button:
		const ctaButton = document.createElement('button');
		ctaButton.innerText = 'BUY TICKETS';
		ctaButton.classList.add('listing__tickets-btn');

		//add all content to new listing, and add it to the page:
		listing.append(dateWrapper);
		listing.append(venueWrapper);
		listing.append(locationWrapper);
		listing.append(ctaButton);

		container.append(listing);
	}
};

// const buildShowsSection = array => {};

if (window.screen.width < 786) {
	buildMobileShowsSection(upcomingShows);
}
// else {
//     buildShowsSection(upcomingShows);
// }
