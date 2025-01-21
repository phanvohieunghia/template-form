# Frontend React Project

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Folder Structure](#folder-structure)
7. [Contributing](#contributing)
8. [License](#license)

---

## Introduction

This project is a React-based frontend application designed to deliver an interactive and modern user experience. It serves as public service, help customer find template form and will be adviced by many experienced experts.

---

## Features

- Search: Find template form with filter.
- Recommend: Recommend the search base on input of customer.

---

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules, Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Incomming Update

---

## Getting Started

### Prerequisites

- Node.js (v23.6.0 or higher)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://nghiaphan1@bitbucket.org/aivos/template-form.git
   ```
2. Navigate to the project directory:
   ```bash
   cd .\template-form\
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

---

## Running the Application

1. Start the development server:
   ```bash
   pnpm dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

---

## Folder Structure

```
project-name/
├── public/               # Static files
│   └── logo.svg          # Project logo
├── src/                  # Source files
│   ├── assets/           # Images, icons, and other assets
│   ├── components/       # Reusable components
│   ├── configs/          # Project configurations (e.g., tailwind, global variables)
│   ├── context/          # Context providers
│   ├── hooks/            # Custom hooks
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   ├── routes/           # Routing
│   ├── services/         # API calls
│   ├── stores/           # Global state management
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   └── index.tsx         # Entry point
├── index.html          # # Main HTML file
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # ESLint configuration
├── .prettierrc           # Prettier configuration
└── README.md             # Project documentation
```

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
