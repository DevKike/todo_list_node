# To-Do List REST API

REST API for managing to-do lists.

### Getting Started

To get started with this project, follow these steps:

1. **Clone the project repository:**
    ```bash
    git clone https://github.com/DevKike/todo_list_node.git
2. **Install project dependencies:**
    ```bash
    npm i
3. **Create the necessary database tables:**
    ```bash
    npm run migration:run
4. **Execute the project:**
    ```bash
    npm run dev
5. **Execute unit tests:**
    ```bash
    npm run test:dev
    
### Project description

The goal of this project is to develop a REST API capable of handling users' to-do lists. It provides functionalities for managing users and their corresponding to-do tasks. This API is designed to simplify task management and enhance the user experience in organizing their daily activities.

### Project Requirements

#### User Management:

1. **Create Users:**
    - Users can be created by providing the necessary information such as name, last name, email and password.
    - Each user should be assigned a unique identifier automatically.

2. **Get Users:**
    - Retrieve information about a specific user based on their unique identifier.

3. **Update Users:**
    - Allow users to update their information, such as name, last name, email, or password.
    - Ensure that the update process is secure and data integrity is maintained.

4. **Delete Users:**
    - Provide the ability to delete a user account.
    - Ensure that user-related data is handled appropriately during the deletion process.

#### To-Do Management:

5. **Create To-Do Items:**
    - Users can create new pending tasks by specifying a title, description and whether the task is already completed.
    - Automatically generate a unique identifier for each pending task.

6. **Get To-Do Items:**
    - Retrieve information about a specific to-do item based on its unique identifier.
    - Obtain a list of all to-do items associated with a user.

7. **Update To-Do Items:**
    - Allow users to update the details of a to-do item, including its title, description, and completion status.
    - Ensure that the update process is secure and data integrity is maintained.

8. **Delete To-Do Items:**
    - Provide the ability to delete a finished task.
    - Ensure that associated data is handled appropriately during the deletion process.

9. **Complete/Undo To-Do Items:**
    - Allow users to mark a to-do item as completed or revert it to an incomplete status.
    - Record the status change in the database.

### Required Technologies

- **Node.js and Express.js:**
    - Used for building the REST API.

- **MySQL:**
    - A relational database used to store users and their respective task lists.

- **Sequelize:**
    - An Object-Relational Mapping (ORM) tool, facilitating database interactions and providing a convenient way to work with databases.

- **Jest:**
    - Used to test libraries and write unit tests to ensure code reliability.


### Deliverables
- A fully functional REST API that meets the mentioned requirements.
