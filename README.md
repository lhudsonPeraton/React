# React Sample App

## Introductions
VS Code is an IDE we recommend for working with React

## Deploying the Sample App Locally
1. Install NodeJS
2. Clone this repository
3. Change directories into the React folder if necessary
   - Run `cd React`
4. Run `npm install @mui/material @emotion/react @emotion/styled react-router-dom@6 react-leaflet react-plotly.js plotly.js axios`
5. Run `npm run start`
   - Any warnings can be ignored
6. Open a web browser and go to https://localhost:3000
   - The sample app should load on the screen! 
    
## Creating a New React App

1. Install NodeJS 
2. run `npx create-react-app react-bootstrap-app` to create the base React app  
3. run `npm install @mui/material @emotion/react @emotion/styled   react-router-dom@6 react-leaflet react-plotly.js plotly.js axios` to install the material-ui, react-router, react-leaflet, and plotly dependencies  
4. run `npm run start` to run the react app  

## Tips for Beginners

### Steps for creating a component

1. Design the layout of the webpage and break it down into reusable components where possible  
2. Determine how data will flow in your application (passing via props and component state)  
3. For each component, add a JavaScript file (.js or .jsx) to the `/src` folder  
4. Create a skeleton of a React function or class component with the same name as the file
5. Import needed components from your other created components and libraries
6. Add state and props as needed

### Steps for adding components to your page

1. See index.js where top-level component, App.js, is rendered
2. You must have App.js or a component rendered by App.js render your component to have it show up
3. Import your component from within project (see code examples)
4. Add component to render/return (e.g. `<MyComponent />`)

### Steps for using REST calls

1. Determine the API endpoint you want to call and what type of response it returns
2. Determine in which component this data should live
3. Use Fetch/Axios to call API upon component mount lifecycle method (useEffect or componentDidMount)
4. Use part or all of the API response to set component state
5. Render component(s) and/or pass data via props as needed
