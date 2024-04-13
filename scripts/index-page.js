//Daniel's code:
//Clear comments before adding new comment:
// const removeComments = e => {
// 	const parent = document.getElementById('previous-comments');
// 	parent.innerHTML = '';
// 	const inputFullName = document.getElementsByTagName('input');
// 	inputFullName.username.value = '';
// 	const inputTextArea = document.getElementsByTagName('textarea');
// 	inputTextArea.comment.value = '';
// };

//Comment handling:
// const createPost = (event, userProfile) => {
// 	//stop refresh:
// 	event.preventDefault();

// 	//grab form data:
// 	const username = userProfile.username;
// 	const postTitle = event.target.title.value;
// 	const postContent = event.target.body.value;

// 	//select parent div where post will be created:
// 	const parentDiv = document.querySelector('.posts');
// 	//create a new post element:
// 	const postDiv = document.createElement('div');
// 	//add the class:
// 	postDiv.classList.add('posts__item');
// 	//create the post elements as children, including classes and content:
// 	//create the post title:
// 	const postTitlePar = document.createElement('p');
// 	//add the class:
// 	postTitlePar.classList.add('posts__title');
// 	//insert post title content:
// 	postTitlePar.innerText = username + ' has posted: ' + postTitle;
// 	//add post title to the new post:
// 	postDiv.append(postTitlePar);

// 	//create the post body:
// 	const postBodyPar = document.createElement('p');
// 	//add the class:
// 	postBodyPar.classList.add('posts__content');
// 	//insert post body text:
// 	postBodyPar.innerText = postContent;
// 	//add post body to the new post:
// 	postDiv.append(postBodyPar);

// 	//create the post's like button:
// 	const postLikeBtn = document.createElement('button');
// 	//add the class:
// 	postLikeBtn.classList.add('btn--regular');
// 	//insert button text:
// 	postLikeBtn.innerText = 'Like';
// 	//add like button to the new post:
// 	postDiv.append(postLikeBtn);

// 	//add the new post element to the parent div:
// 	parentDiv.prepend(postDiv);
// };

// //DOM event to run createPost function on click of 'post' button:
// const postButtonElement = document.querySelector('.start-post-user__text');

// postButtonElement.addEventListener('submit', event => {
// 	createPost(event, userProfile);
// 	//clear the input fields:
// 	document.getElementById('title').value = '';
// 	document.getElementById('body').value = '';
// });

//Hugo's code:
// Comment creation function:
// function createComment(comment) {
//   // Create elements
//   const newComment = document.createElement("div");
//   newComment.classList.add("past-comments__container");

//   const commentAvatar = document.createElement("div");
//   commentAvatar.classList.add("past-comments__avatar");

//   const commentAvatarImg = document.createElement("span");
//   commentAvatarImg.classList.add("past-comments__avatar--avatar-img");
//   ...
//   const commentUsername = document.createElement("h3");
//   commentUsername.classList.add("past-comments__user-name");
//   commentUsername.innerText = comment.username;
//   ...

//   // Build component
//   commentAvatar.appendChild(commentAvatarImg);
//   commentAvatar.appendChild(commentUsername);

//   ...

//   newComment.appendChild(commentAvatar);

//   return newComment;
// }

/////////////////////////////////////////////
//User object:
const userData = {
	name: 'Mohan Muruge',
	avatar: './assets/images/Mohan-muruge.jpg',
};

// Load user profile image:
const loadUser = user => {
	const commentAvatar = document.querySelector('.comments__avatar');
	commentAvatar.setAttribute('src', user.avatar);
};

// loadUser(userData);

//Comment array:
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

//Handle comment submission:
const formSubmitBtn = document.getElementById('comment-form-submit');
formSubmitBtn.addEventListener('click', () => {
	//grab form data:
	const name = document.getElementById('comment-name');
	const text = document.getElementById('comment-text');

	//grab the date, and add leading 0s if necessary:
	const today = new Date();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	const year = today.getFullYear();

	//create new comment object:
	const newComment = {
		name: name.value,
		timestamp: `${month}/${day}/${year}`,
		text: text.value,
	};

	//add new object to array:
	comments.unshift(newComment);

	//empty form fields:
	name.value = '';
	text.value = '';
});

//Clear comments section:
const clearAllComments = () => {
	document.querySelector('.comments__container').innerHTML = '';
};

//Create a new comment:
const createComment = () => {};

//Generate all comments:
for (comment of comments) {
	createComment(comment);
}
