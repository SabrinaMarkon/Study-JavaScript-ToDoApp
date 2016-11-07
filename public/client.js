// MVC: Model
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // // Get number of completed todos.
    // for (var i = 0; i < totalTodos; i++) {
    //   if (this.todos[i].completed === true) {
    //     completedTodos++;
    //   }
    // }
    
    // instead of for loop, use forEach with a callback function:
    // the advantage is just ease of writing/reading really. 
    // forEach can be used on any array.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    
    // // Case 1: If everything’s true, make everything false.
    // if (completedTodos === totalTodos) {
    //   // for (var i = 0; i < totalTodos; i++) {
    //   //   this.todos[i].completed = false;
    //   // }
    //   this.todos.forEach(function(todo) {
    //     todo.completed = false;
    //   });
      
    // // Case 2: Otherwise, make everything true.
    // } else {
    //   // for (var i = 0; i < totalTodos; i++) {
    //   //   this.todos[i].completed = true;
    //   // }
    //   this.todos.forEach(function(todo) {
    //     todo.completed = true;
    //   });
    // }
    
    // More straightforward way than the above:
    this.todos.forEach(function(todo) {
      // Case 1: If everything’s true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        // Case 2: Otherwise, make everything true.
        todo.completed = true;
      }
    
    
    });
  }
};

// MVC: Controller
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

// MVC: View
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    // for (var i = 0; i < todoList.todos.length; i++) {
    //   var todoLi = document.createElement('li');
    //   var todo = todoList.todos[i];
    //   var todoTextWithCompletion = '';

    //   if (todo.completed === true) {
    //     todoTextWithCompletion = '(x) ' + todo.todoText;
    //   } else {
    //     todoTextWithCompletion = '( ) ' + todo.todoText;
    //   }
      
    //   todoLi.id = i;
    //   todoLi.textContent = todoTextWithCompletion;
    //   todoLi.appendChild(this.createDeleteButton()); // append a delete button for each li
    //   todosUl.appendChild(todoLi);
    // }
    
    // do with forEach instead. NOTE that forEach also passes the INDEX value, which is the same as
    // "i" in a for loop. Below, this extra parameter is called "position".
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      // "this" doesn't work below, as we are currently in the CALLBACK function
      // which is NOT DIRECTLY on the view object.
      // "this" refers to the "view" object.
      //todoLi.appendChild(this.createDeleteButton()); // append a delete button for each li
      // so: if we want to use "this", we have to put "this" as a SECOND ARGUMENT BELOW of the forEach.
      todoLi.appendChild(this.createDeleteButton()); // append a delete button for each li
      todosUl.appendChild(todoLi);
    }, this); // see "this" to te left!
    
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    // JavaScript EVENT DELEGATION PATTERN: Uses event bubbling
    // Use a single event listener for all clicks on the parent element instead of every 
    //individual child li to be less tedious. 
    // Use the event object to figure out which item was clicked. Delete the todo only if
    // the item clicked was a delete button.
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      // get the element that was clicked on frm the event var.
      var elementClicked = event.target;
      // check if elementClicked is a delete button:
      if (elementClicked.className === 'deleteButton') {
        // run handlers.deleteTodo
        // the li is the parentNode and its id is a string,
        // so we have to parseint for our deleteTodo function.
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
      //console.log(event.target.parentNode.id);
    });    
  }
};

view.setUpEventListeners();









