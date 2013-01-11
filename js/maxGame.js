$(document).ready(function() {
	var balance = $('.balance').attr('value');
	$('p.monitor').fadeTo(0, 0);
	// display balance from value attribute
	$('.balance').html('&#36;' + balance);
});

$('.bets').click( function() {
	var bet,
		balance,
		proceed,
		results,
		elRemAttr;

	$('p.monitor').fadeTo(100, 0);
	bet = $(this).val();
	balance = parseInt($('.balance').html().replace('$', ''));

	$('#dialog-confirm p').html('&#36;' + bet);

	$(function() {
		$('#dialog-confirm').dialog({
			modal: true,
			resizable: false,
			buttons: {
				Confirm: function() {
					proceed = true;
					console.log('proceed', proceed);
					$(this).dialog('close');
					init();
				},
				Cancel: function() {
					proceed = false;
					console.log('proceed', proceed);
					$(this).dialog('close');
					init();
				}
			}
		});
	});
	
	function init() {
		if ( proceed ) {
			$('.bet').html( '&#36;' + bet );
			$('.bets').attr('disabled', '');


			results = getGameResults(bet, balance);

			var property;
			for (property in results) {
				console.log('results.' + property + ': ' + results[property]);
			}

			console.log('delay');
			console.log('');
			elRemAttr = $('.bets');
			setTimeout( function() {
				displayResults(elRemAttr, results);
			}, 1000);
		};
	};
});

/**
* Display Entire Game Result - win or loose
*
* @method triggerEntireGameResult
* @return {object} jQuery UI Dialog Box
*/
function triggerEntireGameResult() {
	$('#dialog-gameResult').dialog({
		modal: true,
		resizable: false,
	});
}

/**
* Display user and computer numbers
*
* @method displayResults
* @param {object} elRemAttr jQuery Object
* @param {object} results
*/
function displayResults(elRemAttr, results) {
	var upperLimit = 100
	var lowerLimit = 0;

	elRemAttr.removeAttr('disabled');
	$('.userNum').html(results.userNum);
	$('.compNum').html(results.compNum);
	$('.balance').val(results.newBal);
	$('.balance').html('$' + results.newBal);

	if (results.userNum > results.compNum) {
		$('p.monitor.user').fadeTo(100, 1);
	} else {
		$('p.monitor.comp').fadeTo(100, 1);
	};

	if (results.newBal <= lowerLimit) {
		$('.bets').attr('disabled', '');
		$('#dialog-gameResult p').html('Balance is at or below $'+ lowerLimit + '<br />You lost');
		triggerEntireGameResult();
	} else if (results.newBal >= upperLimit) {
		$('.bets').attr('disabled', '');	
		$('#dialog-gameResult p').html('Balance is at or above $'+ upperLimit + '<br />You won!');
		triggerEntireGameResult();
	}
};

/**
* @method getGameResults
* @param {integer} betSelected
* @param {integer} balance
* @return {object} with results
*/

function getGameResults(betSelected, balance) {
	var bet,
		bal,
		userNum,
		compNum,
		results;

	bet = parseInt(betSelected);
	bal = parseInt(balance);
	userNum = makeRandNum();
	compNum = makeRandNum();
	results = {};

	if (userNum > compNum) {
		bal = bal + bet;
		console.log('User Won!');
	} else {
		bal = bal - bet;
		console.log('Computer Won!');
	};

	results.bet = bet;
	results.newBal = bal;
	results.userNum = userNum;
	results.compNum = compNum;

	return results;

	function makeRandNum() {
		return Math.round(Math.random() * 100);
	};
};




