$('.bets').click( function() {
	var bet,
		balance,
		proceed,
		results,
		elRemAttr;

	bet = $(this).val();
	balance = parseInt($('.balance').html().replace('$', ''));

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
		elRemAttr = $('.bets');
		setTimeout( function() {
			displayResults(elRemAttr, results);
		}, 2000);

		
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




