//////////////////////
/////DECLARATIONS/////
/////////////////////

//Bandsite API:
import BandSiteApi, { apiKey } from './band-site-api.js';
const commentsApi = new BandSiteApi(apiKey);

//Comments container:
const container = document.querySelector('.comments__container');

//User data:
const user = {
	name: 'Mohan Muruge',
	avatar: './assets/images/Mohan-muruge.jpg',
};

//Load user's avatar:
document.querySelector('.comment__avatar-img').src =  user.avatar;

///Form submit button:
const formSubmitBtn = document.getElementById('comment-form-submit');

///////////////////
/////FUNCTIONS/////
//////////////////

//Submit new comment to API:
const sendComment = async (comment) => {
	await commentsApi.postComment(comment);
}

//Clear old comments:
const clearAllComments = () => {
	while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

//Format timestamps from epoch to MM/DD/YYYY:
const formatTimestamp = timestamp => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
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
	const readableDate = formatTimestamp(post.timestamp);
	date.innerText = readableDate;
	header.append(date);

	wrapper.append(header);

	//create and append comment message:
	const message = document.createElement('p');
	message.classList.add('comment__body');
	message.innerText = post.comment;
	wrapper.append(message);

	//add wrapper to comment:
	comment.append(wrapper);

	return comment;
};

//Comment section generator:
const generateCommentsSection = async () => {
	//Clear old comments:
	clearAllComments();
	//Get comments from API:
	let comments = await commentsApi.getComments();
	//Add comments to page:
	comments.forEach(comment => {
		container.append(createComment(comment));
	});
};

///////////////////////
/////PAGE HANDLING/////
///////////////////////

//Initialize comments section:
generateCommentsSection();

//Handle comment submission:
formSubmitBtn.addEventListener('click', async event => {
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

		//create new comment object, and send it to the database:
		const newComment = {
			"name": name.value,
			"comment": text.value,
		};
		await sendComment(newComment);

		//empty form fields, and clear old comments:
		name.value = '';
		text.value = '';

		//generate new comments:
		await generateCommentsSection();

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
