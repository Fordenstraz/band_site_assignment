//////////////////////
/////DECLARATIONS/////
/////////////////////

//
import BandSiteApi, { apiKey } from './scripts/band-site-api.js';

//User data:
const user = {
	name: 'Mohan Muruge',
	avatar: './assets/images/Mohan-muruge.jpg',
};

//Comments array:
const comments = [
	{
		name: 'Victor Pinto',
		avatar: null,
		timestamp: '11/02/2023',
		text: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
	},
	{
		name: 'Christina Cabrera',
		avatar: null,
		timestamp: '10/28/2023',
		text: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
	},
	{
		name: 'Isaac Tadesse',
		avatar: null,
		timestamp: '10/20/2023',
		text: `I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.`,
	},
];

//Comments container:
const container = document.querySelector('.comments__container');

//Load user's avatar:
const commentAvatar = document.querySelector('.comment__avatar-img');
commentAvatar.setAttribute('src', user.avatar);

///////////////////
/////FUNCTIONS/////
//////////////////

//Comments clearer:
const clearAllComments = () => {
	document.querySelector('.comments__container').innerHTML = '';
};
//Comment element creator:
const createComment = post => {
	//create the shell of the comment:
	const comment = document.createElement('section');
	comment.classList.add('comment');

	//create a default grey avatar:
	const avatar = document.createElement('div');
	avatar.classList.add('comment__avatar');
	//add avatar image, if available:
	if (post.avatar) {
		const avatarImg = document.createElement('img');
		avatarImg.classList.add('comment__avatar-img');
		avatarImg.setAttribute('src', user.avatar);
		avatarImg.setAttribute('alt', 'a user avatar');
		avatar.append(avatarImg);
	}
	comment.append(avatar);

	//create comment content wrapper:
	const wrapper = document.createElement('div');
	wrapper.classList.add('comment__wrapper');

	//create comment header (name and date), and append to wrapper:
	const header = document.createElement('div');
	header.classList.add('comment__header');

	const username = document.createElement('h3');
	username.classList.add('comment__name');
	username.innerText = post.name;
	header.append(username);

	const date = document.createElement('p');
	date.classList.add('comment__date');
	date.innerText = post.timestamp;
	header.append(date);

	wrapper.append(header);

	//create and append comment message:
	const message = document.createElement('p');
	message.classList.add('comment__body');
	message.innerText = post.text;
	wrapper.append(message);

	//add wrapper to comment:
	comment.append(wrapper);

	return comment;
};
//Comment section generator:
const generateComments = () => {
	comments.forEach(comment => {
		container.append(createComment(comment));
	});
};

///////////////////////
/////PAGE HANDLING/////
///////////////////////

//Initialize comments section:
clearAllComments();
generateComments();

//Handle comment submission:
const formSubmitBtn = document.getElementById('comment-form-submit');
formSubmitBtn.addEventListener('click', event => {
	//prevent reload:
	event.preventDefault();

	//grab form data:
	const name = document.getElementById('comment-name');
	const text = document.getElementById('comment-text');

	//check for valid inputs:
	if (name.value && text.value) {
		//remove any previous error classes:
		name.classList.remove('comments__form-field--error');
		text.classList.remove('comments__form-field--error');

		//grab the date, and add leading 0s if necessary:
		const today = new Date();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		const year = today.getFullYear();

		//create new comment object and add to comment array:
		const newComment = {
			name: name.value,
			avatar: user.avatar,
			timestamp: `${month}/${day}/${year}`,
			text: text.value,
		};
		comments.unshift(newComment);

		//empty form fields, and clear old comments:
		name.value = '';
		text.value = '';
		clearAllComments();

		//generate new comments:
		generateComments();
	} else {
		//identify empty fields and apply error class:
		if (!name.value && !text.value) {
			name.classList.add('comments__form-field--error');
			text.classList.add('comments__form-field--error');
		} else if (!name.value) {
			text.classList.remove('comments__form-field--error');
			name.classList.add('comments__form-field--error');
		} else if (!text.value) {
			name.classList.remove('comments__form-field--error');
			text.classList.add('comments__form-field--error');
		}
	}
});
