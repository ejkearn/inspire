function QuoteController(){

	var quoteService = new QuoteService()


	function getQuote(){
		quoteService.getQuote(drawQuote)
	}
	function drawQuote(quote){
		
		document.getElementById('quote').innerText = `${quote.quote} By: ${quote.author}`
	}
		
getQuote()
}
