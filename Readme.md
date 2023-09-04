

# Data Explorer Typescript-React Application

This is a React application that allows users to search for data using various search parameters and displays the results in a tabular format. The application is built using TypeScript and Material-UI (MUI) components for the user interface.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed (https://nodejs.org/)
- Knowledge of TypeScript, React, and Material-UI (MUI)

## Getting Started

1. Clone this repository to your local machine:

   \`\`\`bash
   git clone: 
   https://github.com/Nassreen/Typescript-React-DataExplorer.git

   \`\`\`


2. Install the project dependencies:

   \`\`\`bash
   npm install
   \`\`\`

3. Start the React application:

   \`\`\`bash
   npm start
   \`\`\`

The application should now be running locally on \`http://localhost:3000\`.

## Usage

- In the application, you can search for data using the following search parameters:
  - Nachname (Last Name)
  - Vorname (First Name)
  - IBAN
  - E-Mail
  - Ort (City)
- At least one field must be filled out to perform a search.
- The search is triggered by user interaction.
- While a search is in progress, a loading indicator will be displayed.

## Features

- **Search**: Search for data based on the specified parameters.
- **Loading Indicator**: A loading indicator is displayed during search operations.
- **Filtering by Ort**: If you search by "Ort" (City), either "Nachname" (Last Name) or "Vorname" (First Name) must also be filled out. In this case, the filtering by Ort is performed in the web application, not in the backend.
- **Tabular Display**: Display search results in a table with the following columns:
  - Name
  - Vorname
  - Geschlecht (Gender)
  - Email
  - Ort
  - IBAN (comma-separated)


## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them.
4. Create a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


