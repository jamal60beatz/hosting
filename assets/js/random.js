$(window).scroll(function(){
	if ($(this).scrollTop() > 50) 
		$('#header').addClass("fixed").fadeIn();
	else 
		$('#header').removeClass("fixed");
});

function NoBack(){
	//	history.go(1)
}

function deshabilitaRetroceso(){
	window.location.hash="no-back-button";
	window.location.hash="Again-No-back-button" //chrome
	window.onhashchange=function(){window.location.hash="no-back-button";}
}

if(navigator.cookieEnabled){}else{alert('Cookies NO disponibles');}