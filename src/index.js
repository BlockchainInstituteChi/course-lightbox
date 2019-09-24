
function bci_display_lightbox () {

	var cancelButton 			= document.createElement('span');
		cancelButton.innerHTML 	= "✕";
		cancelButton.onclick 	= function () { bci_cancel_lightbox() };

	cancelButton = bci_set_style_array(cancelButton, {
		fontSize 	: "1.5em",
		color		: "white",
		left		: "1em",
		top			: "1em",
		position	: "absolute"
	});

	var logo 				= document.createElement('img');
		logo.src			= "https://static.theblockchaininstitute.org/wp-content/uploads/2018/10/cropped-logo_color-2.jpg";

	logo 	= bci_set_style_array(logo, {
			width 		: "auto",
			maxHeight	: "2em",
			display 	: "block",
			margin		: "auto"
	});

	var warning 			= document.createElement('span');
		warning.innerHTML 	= "Warning: You are not currently logged in. You can take courses, but your progress will not be tracked.";

	warning 	= bci_set_style_array(warning, {
			color 		: "red",
			padding		: "1em",
			display 	: "block"
	});

	var message 			= document.createElement('span');
		message.innerHTML 	= "Click here to create a free account to track progress and get access to exclusive offers!";
	
	message 	= bci_set_style_array(message, {
			color 		: "black",
			display 	: "block",
			padding		: "1em",
			fontWeight	: "600"
	});

	var messageBox 			= document.createElement('div');
		messageBox.id 		= "bci-lightbox-message-box";
		messageBox.appendChild(logo);
		messageBox.appendChild(warning);
		messageBox.appendChild(message);
		messageBox.onclick 	= function () { bci_login_or_signup() };

	messageBox 	= bci_set_style_array(messageBox, {
			width 		: "fit-content",
			height 		: "fit-content",
			zIndex 		: "10000",
			textAlign	: "center",
			background	: "white",
			padding		: "2em",
			margin		: "auto",
			maxWidth	: "50vw",
			cursor		: "pointer"
	});

	var lightBox 			= document.createElement('div');
		lightBox.id 		= "bci-lightbox";
		lightBox.onclick 	= function () { bci_cancel_lightbox() };

	lightBox = bci_set_style_array( lightBox, {
			width 		: "100vw",
			position 	: "absolute",
			height 		: "100vh",
			zIndex 		: "10000",
			top 		: "0",
			left		: "0",
			textAlign	: "center",
			background	: "#0000008a",
			padding		: "10vw",
			cursor		: "not-allowed"
		});

	lightBox.appendChild(cancelButton);
	lightBox.appendChild(messageBox);

	document.body.appendChild(lightBox);

}


function bci_set_style_array ( div, styles ) {
	for ( var key in styles ) {
		div.style[key] = styles[key];
	}
	return div;
}


function bci_cancel_lightbox () {
	var element = document.getElementById("bci-lightbox");
    element.parentNode.removeChild(element);
    bci_set_sleeper_cookie ();
}

function bci_set_sleeper_cookie () {
	var date = new Date();
	var dayDelay = 1;
	date.setDate(date.getDate() + dayDelay);
    document.cookie = "user_wants_anonymity=true; expires=" + date.toGMTString() + "; path=/;";
}

function bci_check_sleeper_cookie () {
	if ( document.cookie.split('user_wants_anonymity').length > 1 ) {
		return true;
	} else {
		return false;
	}
}

function bci_login_or_signup () {
	window.location = "/wp-login.php";
}

function bci_check_login () {
	var login = document.body.classList.contains( 'logged-in' );
	if ( !login ) {
		if ( bci_check_sleeper_cookie() ) {
			console.log('would have displayed lightbox but user has sleeper cookie')
		} else {
			bci_display_lightbox();
		}
	} 
}

document.addEventListener("DOMContentLoaded", bci_check_login);