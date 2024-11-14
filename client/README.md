# Movie Booking App Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to Setup

- Clone the project
- Run `npm install` to install dependencies
- Use below commands to run the app and deploy

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

The CDK infrastructure code in the `infra` folder will deploy this react app to a S3 bucket in AWS with static file hosting.

### Prerequisites

- Ensure you have bootstrapped your AWS account with CDK
- AWS credentials have been set up correctly to grant the deployment

Run `npm run deploy` command to deploy the project
