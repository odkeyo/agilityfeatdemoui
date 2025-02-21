# Frontend - AgilityFeat Demo

## Project Overview
The frontend of this project is built with React and TypeScript, using Material UI for UI components and Axios for API interactions.

## Folder Structure
```
/src
├── components
│   ├── CustomSelectField.tsx
│   ├── CustomTextField.tsx
│   ├── Dashboard.tsx
│   ├── DatePicker.tsx
│   ├── SidebarItem.tsx
│   ├── TransactionFilter.tsx
│   ├── TransactionForm.tsx
├── hooks
│   ├── useFormHandlers.ts
├── interfaces
│   ├── ITransaction.ts
│   ├── ITransactionFilter.ts
├── pages
│   ├── DashboardPage.tsx
│   ├── MaintenancePage.tsx
├── services
│   ├── ITransactionService.ts
│   ├── Result.ts
│   ├── TransactionService.ts
├── utils
│   ├── apiClient.ts
│   ├── dateUtils.ts
│   ├── formFieldRenderer.tsx
├── App.tsx
├── index.tsx
```

## Setup Instructions
To set up the frontend locally, follow these steps:
```
# Clone the repository
git clone https://github.com/your-repo/frontend.git

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## Challenges & Learnings
- **Dependency Compatibility:** Integrating libraries like Axios and Material UI was challenging due to version dependencies. Certain versions caused breaking changes, requiring adjustments in component imports and hooks.
- **Form Handling:** Managing form state with reusable hooks like `useFormHandlers` improved maintainability but required a careful setup to handle various input types correctly.
- **TypeScript Strictness:** TypeScript’s type safety helped catch potential runtime errors early but required explicit type definitions, especially when handling API responses.

## Next Steps
To improve the project further:
- Enhance error handling for API calls.
- Improve UI responsiveness with better Material UI breakpoints.
- Refactor common UI components to be more reusable.

## Contributors
Developed by **Diego Cárdenas**
