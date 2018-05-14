function TodoController() {
	// new up the TodoService that has already been configured for your use
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again
	var todoService = new TodoService()

	// Use this getTodos function as your callback for all other edits
	function getTodos() {
		//FYI DONT EDIT ME :)
		debugger
		todoService.getTodos(draw)
	}

	function draw(todos) {
		//WHAT IS MY PURPOSE?
		//BUILD YOUR TODO TEMPLATE HERE
		var template = ''
		var formTemplate = ''
		if (!todoService.loadName()) {
			formTemplate += `<form onsubmit="app.controllers.todoController.newName(event)">
		<input class="form-control" type="text" name="newName" placeholder="Your Name">
		<button type="submit">Submit</button>
	</form>`
		} else {
			formTemplate += `<form onsubmit="app.controllers.todoController.addTodoFromForm(event)">
		<input class="form-control" type="text" name="todo" placeholder="Your To Do:">
		<button type="submit">Submit</button>
	</form>`

			template = `<div>
	${todoService.getName()}'s To Do List: <button class="btn-info" onclick="app.controllers.todoController.deleteName()">New Name</button></div>
	<ul>`
			for (let i = 0; i < todos.length; i++) {
				var todo = todos[i]
				if (!todo.completed) {
					template += `<li>
			<input type="checkbox" id="done" onchange="app.controllers.todoController.toggleTodoStatus('${todos[i]._id}')"><label for="done"></label>
			${todo.description}
			<button class="btn-danger btn-custom" onclick="app.controllers.todoController.deleteTodo('${todo._id}')">X</button>
			
			</li>`
				} else {
					template += `<li>
			<input type="checkbox" id="done" onchange="app.controllers.todoController.toggleTodoStatus('${todos[i]._id}')" checked><label for="done"></label>
			<del>${todo.description}</del>
			<button class="btn-danger btn-custom" onclick="app.controllers.todoController.deleteTodo('${todo._id}')">X</button>
			
			</li>`
				}
			}
			template += `</ul>`
		}
		document.getElementById('todoForm').innerHTML = formTemplate
		document.getElementById('todo').innerHTML = template

		//DONT FORGET TO LOOP
	}

	this.deleteName = function deleteName() {
		todoService.deleteName(draw)
	}

	this.newName = function NewName(e) {
		e.preventDefault()
		debugger
		var newName = e.target.newName.value
		
		todoService.newName(newName, getTodos)
	}

	this.deleteTodo = function deleteTodo(id) {
		todoService.removeTodo(id, getTodos)
	}

	this.addTodoFromForm = function (e) {
		e.preventDefault() // <-- hey this time its a freebie don't forget this
		// TAKE THE INFORMATION FORM THE FORM
		var form = e.target
		var todo = { description: form.todo.value }
		// DONT FORGET TO BUILD YOUR TODO OBJECT



		//PASSES THE NEW TODO TO YOUR SERVICE
		//DON'T FORGET TO REDRAW THE SCREEN WITH THE NEW TODO
		//YOU SHOULDN'T NEED TO CHANGE THIS
		todoService.addTodo(todo, getTodos)
		form.reset()

		//^^^^^^^ EXAMPLE OF HOW TO GET YOUR TOODOS AFTER AN EDIT
	}

	this.toggleTodoStatus = function (todoId) {
		// asks the service to edit the todo status
		todoService.toggleTodoStatus(todoId, getTodos)
		// YEP THATS IT FOR ME
	}

	this.removeTodo = function (todoId) {
		// ask the service to run the remove todo with this id

		// ^^^^ THIS LINE OF CODE PROBABLY LOOKS VERY SIMILAR TO THE toggleTodoStatus
	}

	// IF YOU WANT YOUR TODO LIST TO DRAW WHEN THE PAGE FIRST LOADS WHAT SHOULD YOU CALL HERE???
	getTodos()
}
