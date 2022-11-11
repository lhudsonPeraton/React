# VTHacks
VT Hacks 2022 

Introductions
    VS Code is an IDE we recommend for working with React
    
Creating a react app

    1. Install NodeJS
    2. run "npx create-react-app react-bootstrap-app" to create the base react app
    3. run "npm install @mui/material @emotion/react @emotion/styled react-router-dom@6 react-plotly.js plotly.js axios" to install the material-ui dependencies
    4. run "npm run start" to run the react app

Steps for creating a component

    1. Design the layout of the webpage and break it down into reusable components where possible
    2. Determine how data will flow in your application (passing via props and component state)
    2. For each component, add a JavaScript file (.js or .jsx) to the /src folder
    3. Create a skeleton of a React function or class component with the same name as the file
    4. Import needed components from your other created components and libraries
    5. Add state and props as needed

Steps for adding components to your page

    1. See index.js where top-level component, App.js, is rendered
    2. You must have App.js or a component rendered by App.js render your component to have it show up
    3. Import your component from within project (see code examples)
    4. Add component to render/return (e.g. <MyComponent />)

Steps for use rest calls

    1. Determine the API endpoint you want to call and what type of response it returns
    2. Determine in which component this data should live
    3. Use Fetch/Axios to call API upon component mount lifecycle method (useEffect or componentDidMount)
    4. Use part or all of the API response to set component state
    5. Render component(s) and/or pass data via props as needed




