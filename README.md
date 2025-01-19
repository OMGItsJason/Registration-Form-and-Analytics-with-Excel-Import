# Registration Form and Analytics with Excel Import and Export.

This project is a web application built using modern technologies to provide a robust registration form, analytics features, and Excel import/export functionality.

## Features

- **User Registration Form:** A responsive and dynamic registration form with a clean UI.
- **Analytics Dashboard:** Provides insights into the registered data with visualizations.
- **Excel Import/Export:** Seamlessly import and export data in Excel format.
- **Modern UI:** Built with TailwindCSS and ShadCN for a sleek and user-friendly interface.
- **Database Integration:** Uses Prisma to connect to a PostgreSQL database for reliable and scalable data management.

## Technology Stack

- **Frontend Framework:** [Svelte 5](https://svelte.dev/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) and [ShadCN](https://shadcn.dev/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **File Handling:** Excel file import/export functionality.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-repo-name/Registration-Form-and-Analytics-with-Excel-Import.git
   cd registration-form-analytics
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/your-database-name
   ```

4. **Run Database Migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173`.

## Project Structure

- `src/`
  - **`components/`**: Reusable Svelte components.
  - **`routes/`**: Application routes.
  - **`lib/`**: Helper functions and utilities.
- `prisma/`
  - **`schema.prisma`**: Database schema.
- `public/`: Static assets.

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run preview`**: Preview the production build.
- **`npx prisma studio`**: Open Prisma Studio to manage your database.

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear messages.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to open an issue or reach out if you have questions or suggestions!
