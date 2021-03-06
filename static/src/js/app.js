import {SomeComponent} from './components/SomeComponent';
import {AnimatedGif} from './components/AnimatedGif';
import {AnimatedTerminal} from './components/AnimatedTerminal';
import {actionSet} from './data/ActionSet';

var started = false;

var initFn = function() {
	if (started) {
		return;
	}
	started = true;
	$('#phoneGIF').attr('src', "https://s3.amazonaws.com/kryptco-assets/krypt-gif.gif");
	$('#phoneGIFFirstFrame').detach();


    let actions = [
        {
            lines: [['$', 'ssh root@server', true],
                ['root:~#', '', true, 1000],
			],
            notificationText: 'Your private key was used: <br> <span style="">ssh root@server</span>',
            notificationIndex: 0,
			notificationDelay: 6000,
        },
        {
            lines: [['$', 'git pull origin master', true],
            ['', 'Updating c21fc5a..3b8a0a5', false, 10],
            ['', '7 files changed, done.', false],
            ['$', '', true, 4000]],
            notificationIndex: 0,
            notificationText: 'Your private key was used: <br> <span style="">git pull github:hello.git</span>',
			notificationDelay: 1000,
        }
    ]

    animateAction(0);

    function animateAction (i) {
        let a = actions[i];
        let animatedTerminal = new AnimatedTerminal (a.lines, {notificationIndex: 0, notificationText: a.notificationText, notificationDelay: a.notificationDelay});
        animatedTerminal.startAnimation( () => {
			if (i == actions.length-1) {
				$('#phoneGIF').attr('src', "https://s3.amazonaws.com/kryptco-assets/krypt-gif.gif")
			}
            (i == actions.length-1 ? animateAction(0) : animateAction(i+1) );
        });
    }
};

function formSuccess() {
	$("#signupForm").html("<p><strong>Thanks for signing up! Look out for an invite shortly.</strong></p>");
}

function formError() {

}

function signupFormSubmit() {
	// Add the iframe with a unique name
	var iframe = document.createElement("iframe");
	var uniqueString = String(Math.random());
	document.body.appendChild(iframe);
	iframe.style.display = "none";
	iframe.contentWindow.name = uniqueString;

	// construct a form with hidden inputs, targeting the iframe
	var form = document.createElement("form");
	form.target = uniqueString;
	form.action = "https://docs.google.com/forms/d/e/1FAIpQLSed2U7xikAyQLujJuXO0K2Bgz3bTmVSrv7JyvsvfpEggT4gqg/formResponse";
	form.method = "POST";

	// repeat for each parameter
	var input = document.createElement("input");
	input.type = "hidden";
	input.name = "entry.1643900225";
	input.value = $("#signupFormEmail").val();
	form.appendChild(input);

	document.body.appendChild(form);
	form.submit();
	formSuccess();
}

$(document).ready(function() {
    $('#get-started-button').on('click', scrollToGetStartedSection);
    $('.FAQ__question').on('click', function() {
        $(this).toggleClass('open');
        $(this).find('.FAQ__question__answer').slideToggle(500, 'easeInOutQuad');
    });
	$("#signupFormSubmit").click(signupFormSubmit);
	$('#phoneGIF').attr('src', "https://s3.amazonaws.com/kryptco-assets/krypt-gif.gif")
	$("#phoneGIF").load(initFn);
	setTimeout(function() {
		initFn();
	}, 6000);
	$('#signupFormEmail').bind("enterKey",signupFormSubmit);
	$('#signupFormEmail').keyup(function(e){
		if(e.keyCode == 13)
		{
			$(this).trigger("enterKey");
		}
	});
	$('.Page-header__menu-button').on('click', function () {
		let $p = $(this).parent();
		if ($p.hasClass('open')) {
			$('html, body').css('overflow', 'initial');
		} else {
			$('html, body').css('overflow', 'hidden');
		}
		$p.toggleClass('open');
	});
	$('.Page-header__overlay').on('click', function () {
		let $p = $(this).parent();
		$('html, body').css('overflow', 'initial');
		$p.toggleClass('open');
	});
});

function scrollToGetStartedSection () {
    let offset = $('.Section--get-started').offset().top;

    $('html, body').animate({
        scrollTop: offset
    }, 1000, 'easeInOutQuart');
}
