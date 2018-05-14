function TodoService() {
	// A local copy of your todos
	var todoList = []
	var baseUrl = 'https://bcw-sandbox.herokuapp.com/api/'
	var userName = localStorage.getItem('userName')

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
		//CAN YOU NOTIFY THE USER IF SOMETHING BREAKS? 
		//do this without breaking the controller/service responsibilities
	}

	this.loadName = function loadName() {
		var localName = localStorage.getItem('userName')
		if (localName) {
			userName = localName;
			return userName;
		}

		return false

	}

	this.newName = function setName(newName, cb) {
		localStorage.setItem('userName', newName)
		console.log(localStorage.getItem('userName'))
		userName = newName
		cb()

	}
	this.getName = function getName(){
		return localStorage.getItem('userName')
	}
	this.deleteName = function deleteName(cb){
		localStorage.removeItem('userName')
		cb()
	}


	this.getTodos = function (cb) {
		if (userName){
			$.get(baseUrl+userName+'/todos/')
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????
				
				todoList = res.data
				cb(res.data)
			})
			.fail(logError)
		}
		cb(todoList)
	}


	this.getOneTodo = function (id, cb) {
		$.get(baseUrl+userName+'/todos/' + id)
			.then(function (res) { // <-- WHY IS THIS IMPORTANT????

				// cb(res.data)
			})
			.fail(logError)
	}

	this.addTodo = function (todo, cb) {
		// WHAT IS THIS FOR???
		$.post(baseUrl+userName+'/todos/', todo)
			.then(function (res) {
				cb(res.data)

			})
			.fail(logError)
	}

	this.toggleTodoStatus = function (todoId, cb) {
		// MAKE SURE WE THINK THIS ONE THROUGH
		//STEP 1: Find the todo by its index **HINT** todoList
		var editedTodo = {}
		for (let i = 0; i < todoList.length; i++) {
			var todo = todoList[i]
			if (todo._id == todoId) {
				editedTodo = todo
			}
		}


		//STEP 2: Change the completed flag to the opposite of what is is **HINT** todo.completed = !todo.completed

		editedTodo.completed = !editedTodo.completed

		//STEP 3: Here is that weird Ajax request because $.put doesn't exist
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: baseUrl+userName+/todos/ + todoId,
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

			url: baseUrl+userName+/todos/ + todoId,

		})
			.then(function (res) {

				cb(res.data)
			})
			.fail(logError)
	}



}
