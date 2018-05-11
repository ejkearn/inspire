function ImageController() {
	//Private
	var imageService = new ImageService()
	//Your ImageService is a global constructor function what can you do here if you new it up?
	function drawBackground(res){
		document.body.style.background = `url("${res}") no-repeat center`;
		document.body.style.backgroundSize = '100rem'

	}

	function getImage(){
		imageService.getImage(drawBackground)
	}
getImage()
	
	//Public




}


