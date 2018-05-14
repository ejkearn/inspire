function ImageService() {
	var url = '//bcw-getter.herokuapp.com/?url=';
	var url2 = 'http://www.splashbase.co/api/v1/images/random'
	var apiUrl = url + encodeURIComponent(url2);

	this.getImage = function (callWhenDone) {
		// ^^^^^^^ How do you call this function?
		return $.get(apiUrl, function (res) {
			res = JSON.parse(res)
			// console.log('Image Data:', res)
			callWhenDone(res.url)
		})
	}

		function getTime(){
		var d = new Date();
		console.log(d.toLocaleTimeString().slice(1,2))
		if (d.toLocaleTimeString().slice(1,2) == ":"){
			var time = '0' + d.toLocaleTimeString().slice(0,4);
		} else {

			var time = d.toLocaleTimeString().slice(0,5);
		}
		document.getElementById('time').innerText = time
	}

	window.setInterval(function(){
		getTime()
	}, 5000)
getTime()

}
