# Pharmacy Management System

The Pharmacy Management System is a web application designed to streamline business processes for pharmacies. It provides functionality for managing medications, customers, and users with different roles such as owner, manager, and cashier.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and set up the Pharmacy Management System, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/your-username/pharmacy-management-system.git
    ```

2. Navigate to the project directory:

    ```
    cd pharmacy-management-system
    ```

3. Install dependencies:

    ```
    yarn install
    ```

4. Set up the database by running the provided SQL scripts.

5. Create a `.env` file in the project root and add the necessary environment variables, including database connection details and JWT secret.

6. Start the server:

    ```
    yarn start
    ```

7. The server will start running on the specified port. You can now access the Pharmacy Management System from your web browser.

## Usage

Once the system is set up, you can perform the following actions:

- Add, update, and delete medications.
- Add, update, and delete customers.
- Manage users with different roles (owner, manager, cashier).
- Authenticate users using JSON Web Tokens (JWT).
- Authorize users based on their roles.

### Credentials
- Admin:
   - Username: admin
   - Password: admin123
   - Role: admin
- Manager:
   - Username: manager
   - Password: manager123
   - Role: manager
- Cashier:
   - Username: cashier
   - Password: cashier123
   - Role: cashier
- Owner:
   - Username: owner
   - Password: owner123
   - Role: owner


## Endpoints

The Pharmacy Management System provides the following API endpoints:

- `POST /auth/login`: Authenticate user and generate JWT.
- `GET /medications`: Retrieve all medications.
- `POST /medications`: Add a new medication.
- `PUT /medications/:id`: Update an existing medication.
- `DELETE /medications/:id`: Delete a medication.
- `GET /customers`: Retrieve all customers.
- `POST /customers`: Add a new customer.
- `PUT /customers/:id`: Update an existing customer.
- `DELETE /customers/:id`: Delete a customer.
- `PUT /customers/:id/soft-delete`: Soft delete a customer.
- `GET /users`: Retrieve all users.
- `POST /users`: Add a new user.
- `PUT /users/:id`: Update an existing user.
- `DELETE /users/:id`: Delete a user.

## Technologies Used

The Pharmacy Management System is built using the following technologies:

- Node.js
- Express.js
- SQLite
- JSON Web Tokens (JWT)

## Contributing

Contributions to the Pharmacy Management System are welcome! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request detailing your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
