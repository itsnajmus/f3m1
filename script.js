// Initialize an empty array for the employees
let employees = [];

// Select the form and the employees list
const form = document.getElementById('employee-form');
const employeesList = document.getElementById('employees');

// Define a function to add a new employee to the array and the employees list
function addEmployee(event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the input values
  const name = document.getElementById('name').value;
  const profession = document.getElementById('profession').value;
  const age = parseInt(document.getElementById('age').value);

  if (!name || !profession || !age) {
    // Display an error message
    showMessage('Please fill in all the required fields', 'error');
    return;
  }

  // Create a new employee object with an automatically assigned ID
  const id = employees.length + 1;
  const newEmployee = { id, name, profession, age };

  // Add the new employee to the array
  employees.push(newEmployee);

  // Update the employees list
  updateEmployeesList();

  // Clear the input values
  form.reset();

  // Show a success message
  showMessage('success', 'Employee added successfully');
}

// Define a function to update the employees list based on the employees array
function updateEmployeesList() {
  // Clear the current list items
  employeesList.innerHTML = '';

  // Map the employees array to an array of HTML list items
  const employeesItems = employees.map((employee) => {
    return `<li>${employee.name} - ${employee.profession} - ${employee.age} years old <button class="delete" data-id="${employee.id}">Delete</button></li>`;
  });

  // Add the list items to the employees list
  employeesList.innerHTML = employeesItems.join('');

  // Add event listeners to the delete buttons
  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deleteEmployee);
  });
}

// Define a function to delete an employee from the array and the employees list
function deleteEmployee(event) {
  // Get the ID of the employee to delete
  const id = parseInt(event.target.dataset.id);

  // Find the index of the employee in the array
  const index = employees.findIndex((employee) => employee.id === id);

  // Remove the employee from the array
  employees.splice(index, 1);

  // Update the employees list
  updateEmployeesList();
}

// Define a function to show a message with a given type and text
function showMessage(type, text) {
  // Create a message element with the given type and text
  const message = document.createElement('div');
  message.classList.add(type);
  message.innerText = text;

  // Insert the message before
  // the form element
  form.insertAdjacentElement('beforebegin', message);
  
  // Remove the message after 3 seconds
  setTimeout(() => {
  message.remove();
  }, 3000);
  }
  
  // Add an event listener to the form submit button to add a new employee
  form.addEventListener('submit', addEmployee);
  
  // Initialize the employees list
  updateEmployeesList();