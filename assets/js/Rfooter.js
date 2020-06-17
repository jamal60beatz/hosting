$(document).ready(function() {
	$('#rightFoot').click(function() {
		if ($('#rightFoot').css('right')=='0px') {
			$('#rightFoot').css('right', '350px');
			$('#rightFootA').css('opacity', '1');
			$('#rightFiso').css('visibility', 'visible');
			$('#rightFiso').css('opacity', '1');
			$('#finfo').css('width', '350px');
			$('#finfo').css('box-shadow', 'rgb(255, 206, 0) -2px 0px 0px 1px');
		} else {
			$('#rightFoot').css('right', '0px');
			$('#rightFootA').css('opacity', '0');
			$('#rightFiso').css('visibility', 'hidden');
			$('#rightFiso').css('opacity', '0');
			$('#finfo').css('width', '0px');
			$('#finfo').css('box-shadow', 'rgb(255, 206, 0) 0px 0px 0px 0px');
		}
	});

	$('#rightFiso').click(function() {
		$('#rightFoot').css('right', '0px');
		$('#rightFootA').css('opacity', '0');
		$('#rightFiso').css('visibility', 'hidden');
		$('#rightFiso').css('opacity', '0');
		$('#finfo').css('width', '0px');
		$('#finfo').css('box-shadow', 'rgb(255, 206, 0) 0px 0px 0px 0px');
	});
});