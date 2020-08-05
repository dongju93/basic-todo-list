// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);

// Functions
function addTodo (event) {
	// Prevnet form submitting
	event.preventDefault();

	// Todo div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

	// Create li
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);

	// Add todos to local storages
	saveLocalTodos(todoInput.value);

	// CHECK button
	const completeButton = document.createElement('button');
	completeButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
	completeButton.classList.add('complete-btn');
	todoDiv.appendChild(completeButton);

	// DELETE button
	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fa fa-minus" aria-hidden="true"></i>';
	deleteButton.classList.add('delete-btn');
	todoDiv.appendChild(deleteButton);

	// append to list
	todoList.appendChild(todoDiv);
	// reset input value
	todoInput.value = '';
}

function deleteCheck (e) {
	const item = e.target;
	if (item.classList[0] === 'delete-btn') {
		const todo = item.parentElement;
		// aliimation
		todo.classList.add('fall');
		removeLoaclTodos(todo);
		// when transition is end then remove will execute
		todo.addEventListener('transitionend', function () {
			todo.remove();
		});
	}

	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

function filterTodos (e) {
	const todos = todoList.childNodes;
	console.log(todos);
	todos.forEach(function (todo) {
		console.log(todo);
		switch (e.target.value) {
			// 필터링을 거친 결과를 보여줄땐
			// 기존에 사용하던 CSS 스타일링을 적용시켜야
			// 필터링 전 후 스타일 차이가 없이 된다.
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos (todo) {
	// CHECK
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
	// CHECK
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function (todo) {
		// Todo div
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');

		// Create li
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);

		// CHECK button
		const completeButton = document.createElement('button');
		completeButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
		completeButton.classList.add('complete-btn');
		todoDiv.appendChild(completeButton);

		// DELETE button
		const deleteButton = document.createElement('button');
		deleteButton.innerHTML = '<i class="fa fa-minus" aria-hidden="true"></i>';
		deleteButton.classList.add('delete-btn');
		todoDiv.appendChild(deleteButton);

		// append to list
		todoList.appendChild(todoDiv);
	});
}

function removeLoaclTodos (todo) {
	// CHECK
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	// 넘겨받은 target인 todo에서 innerTEXT를 선택하고
	const todoIndex = todo.children[0].innerText;
	// 선택한 TEXT 에서 1개만 todos(Local Storage)에서 제거
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}
