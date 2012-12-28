$('.bets').click( function() {
	var proceed,
		bet;

	bet = $(this).html();
	proceed = confirm(bet + " bet?");
	
	if ( proceed ) {
	$('.bet').html(bet);
	$('.bets').attr('disabled', '');
	};
});