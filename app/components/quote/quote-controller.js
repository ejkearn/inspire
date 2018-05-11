function QuoteController(){

	var quoteService = new QuoteService()


	function getQuote(){
		quoteService.getQuote(drawQuote)
	}
	function drawQuote(quote){
		
		document.getElementById('quote').innerHTML = `${quote.quote} By: ${quote.author}`
	}
		
getQuote()
}
