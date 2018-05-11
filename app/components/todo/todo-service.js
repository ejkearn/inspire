function TodoService() {
	// A local copy of your todos
	var todoList = []
	var baseUrl = 'https://bcw-sandbox.herokuapp.com/api/Jack/todos/'

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
		//CAN YOU NOTIFY THE USER IF SOMETHING BREAKS? 
		//do this without breaking the controller/service responsibilities
	}

	this.getTodos = function (cb) {
		$.get(baseUrl)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				
				todoList = res.data
				cb(res.data)
			})
			.fail(logError)
	}

	this.getOneTodo = function (id, cb) {
		$.get(baseUrl+id)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				
				// cb(res.data)
			})
			.fail(logError)
	}

	this.addTodo = function (todo, cb) {
		// WHAT IS THIS FOR???
		$.post(baseUrl, todo)
			.then(function(res){
				cb(res.data)
				
			}) 
			.fail(logError)
	}

	this.toggleTodoStatus = function (todoId, cb) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList
		var editedTodo = {}
		for (let i=0; i<todoList.length; i++){
			var todo = todoList[i] 
			if (todo._id == todoId){
				editedTodo = todo
			}
		}
		

		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed

		editedTodo.completed = !editedTodo.completed
		
		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl + todoId,
			data: JSON.stringify(editedTodo) //CHANGE THE 5!!!
		})
			.then(function (res) {
				cb(res)
			})
			.fail(logError)
	}

	this.removeTodo = function (todoId, cb) {
		// Umm this one is on you to write.... It's also unique, like the ajax call above. The method is a DELETE
		$.ajax({
			method: 'DELETE',
			
			url: baseUrl + todoId,
		
		})
			.then(function (res) {
			
				cb(res.data)
			})
			.fail(logError)
	}
		
	

}
