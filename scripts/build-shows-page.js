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

//MOBILE PAGE BUILDER:
const buildMobileShowsSection = array => {
	//refer to 'shows section':
	const showsSection = document.querySelector('.shows');

	//add the heading:
	const showsHeading = document.createElement('h2');
	showsHeading.classList.add('shows__header');
	showsHeading.innerText = 'Shows';
	showsSection.append(showsHeading);

	//create listings container:
	const container = document.createElement('div');

	//generate show listings:
	for (let show of array) {
		//create div to hold listing content:
		const listing = document.createElement('article');
		listing.classList.add('shows__listing');

		//create the date content:
		const dateHeading = document.createElement('h3');
		dateHeading.classList.add('listing__header');
		dateHeading.innerText = 'DATE';

		const dateData = document.createElement('p');
		dateData.classList.add('listing__date');
		dateData.innerText = show.date;

		const dateWrapper = document.createElement('div');
		dateWrapper.classList.add('listing__wrapper');
		dateWrapper.append(dateHeading);
		dateWrapper.append(dateData);

		//create the venue content:
		const venueHeading = document.createElement('h3');
		venueHeading.classList.add('listing__header');
		venueHeading.innerText = 'VENUE';

		const venueData = document.createElement('p');
		venueData.classList.add('listing__place');
		venueData.innerText = show.venue;

		const venueWrapper = document.createElement('div');
		venueWrapper.classList.add('listing__wrapper');
		venueWrapper.append(venueHeading);
		venueWrapper.append(venueData);

		//create the location content:
		const locationHeading = document.createElement('h3');
		locationHeading.classList.add('listing__header');
		locationHeading.innerText = 'LOCATION';

		const locationData = document.createElement('p');
		locationData.classList.add('listing__place');
		locationData.innerText = show.location;

		const locationWrapper = document.createElement('div');
		locationWrapper.classList.add('listing__wrapper');
		locationWrapper.append(locationHeading);
		locationWrapper.append(locationData);

		//create the CTA button:
		const ctaButton = document.createElement('button');
		ctaButton.classList.add('cta-button');
		ctaButton.innerText = 'BUY TICKETS';

		//add all content to new listing:
		listing.append(dateWrapper);
		listing.append(venueWrapper);
		listing.append(locationWrapper);
		listing.append(ctaButton);

		//add listing to container:
		container.append(listing);
	}
	//add container to the parent div:
	showsSection.append(container);
};

//TABLET/DESKTOP PAGE BUILDER:
const buildShowsSection = array => {
	//refer to 'shows section':
	const showsSection = document.querySelector('.shows');

	//add the heading:
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

	//date:
	const dateHeading = document.createElement('p');
	dateHeading.classList.add('listing__header');
	dateHeading.innerText = 'DATE';
	headingRow.append(dateHeading);

	//venue:
	const venueHeading = document.createElement('p');
	venueHeading.classList.add('listing__header');
	venueHeading.innerText = 'VENUE';
	headingRow.append(venueHeading);

	//location:
	const locationHeading = document.createElement('p');
	locationHeading.classList.add('listing__header');
	locationHeading.innerText = 'LOCATION';
	headingRow.append(locationHeading);

	//spacer:
	const spacer = document.createElement('div');
	spacer.classList.add('listing__header');
	headingRow.append(spacer);

	//add them all to the page:
	container.append(headingRow);

	//generate show listings:
	for (show of array) {
		//create div to hold listing content:
		const listing = document.createElement('article');
		listing.classList.add('shows__listing');

		//create listing elements:
		//date:
		const date = document.createElement('p');
		date.classList.add('listing__wrapper', 'listing__date');
		date.innerText = show.date;
		listing.append(date);

		//venue:
		const venue = document.createElement('p');
		venue.classList.add('listing__wrapper', 'listing__place');
		venue.innerText = show.venue;
		listing.append(venue);

		//location:
		const location = document.createElement('p');
		location.classList.add('listing__wrapper', 'listing__place');
		location.innerText = show.location;
		listing.append(location);

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

//CHECK WINDOW SIZE, RUN APPROPRIATE FUNCTION:
if (window.innerWidth < 768) {
	buildMobileShowsSection(upcomingShows);
} else {
	buildShowsSection(upcomingShows);
}

//SHOW ITEM SELECTED STATE:
const showListings = document.querySelectorAll('.shows__listing');

//apply event listener to every listing element:
showListings.forEach(listing => {
	listing.addEventListener('click', () => {
		//remover state from previous selection:
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
