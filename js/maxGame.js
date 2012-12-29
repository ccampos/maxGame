$(document).ready(function() {
		$('p.monitor').fadeTo(0, 0);
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


	$(function() {
		$('#dialog-confirm').dialog({
			height: 140,
			modal: true,
			resizable: false,
			buttons: {
				Confirm: function() {
					proceed = true;
					$(this).dialog('close');
				},
				Cancel: function() {
					proceed = false;
					$(this).dialog('close');
				}
			}
		});
	});
	proceed = confirm('Please confirm: $' + bet + ' bet');
	
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
});

/**
* Display balance, bet, user and computer number labels
*
* @method displayLabels
* @param {object} labels
*/
function displayLabels(labels) {

};


/**
* Display user and computer numbers
*
* @method displayResults
* @param {object} elRemAttr jQuery Object
* @param {object} results
*/
function displayResults(elRemAttr, results) {
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



