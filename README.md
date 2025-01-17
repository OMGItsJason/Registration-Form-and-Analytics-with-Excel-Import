# Registration Form and Analytics with Excel Import

This project is a web application designed for user registration and analytics, with the added functionality of importing data from Excel files. It leverages modern technologies for a seamless, responsive, and secure user experience.

## Features

1. **User Registration Form**:
   - Dynamic and responsive design.
   - Validation for user input.
   - Secure authentication.

2. **Analytics Dashboard**:
   - Visual representation of user data.
   - Filtering and sorting capabilities.

3. **Excel Import**:
   - Easy import of data via Excel files.
   - Automatic parsing and validation of Excel data.

## Tech Stack

### Frontend
- **Svelte 5**: A fast and lightweight framework for building reactive user interfaces.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **ShadCN**: A component library for building accessible and reusable components.

### Backend
- **AuthJS**: Provides secure authentication.
- **Prisma**: An ORM for database management.
- **PostgreSQL**: A robust relational database.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/registration-form-analytics.git
   cd registration-form-analytics
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   AUTH_SECRET=your_auth_secret
   ```

4. **Migrate Database**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```

### Running Tests
To run tests, use:
```bash
npm test
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Happy coding! If you encounter any issues, feel free to open an issue on the repository.