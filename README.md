# CineMachina (Front End - REACT)

## This is a fully functioning front-end React app that allows you to discover and rent your favorite films with ease!

By utilizing a custom proxy-server in combination with the Axios client and JWTs for authentication, we effectively manage all necessary requests and responses to the corresponding back-end API server. This approach not only helps us avoid CORS issues but also ensures secure authentication and authorization processes throughout our application.

All paging routes are being handled by the react-router-dom package.

Lastly, all pages' styling was done using CSS.

> **Note:** Project has been built on a Windows 11 pc, using NPM v9.6.7

---

## How to execute this project locally

Once you have cloned the repository, enter the corresponding directory and use _**npm install**_ to add all the necessary dependencies. Afterwards, you will have to edit the _**vite.config.js**_ file at the root folder directory of this project to specify the IP address and port number where your backend API is hosted.

Finally, you can run _**npm run dev**_ to start the development server and check the application.

## Problems and Solutions

-  **Corrupted or Null Image Data Handling**: Images retrieved from API responses were sometimes corrupted or null. Consequently, these images were skipped during rendering, and movies were displayed using their corresponding titles as identifiers.
-  **Exclusion of Admin and Test Results**: Results containing keywords such as 'admin' or 'test' were deliberately excluded from the rendering process. This decision ensured that only relevant data, free from administrative or test entries, was displayed to users.
-  **Mismatched UUIDs in Rental Movies and Store Movies**: When retrieving data from the server for rented movies, the API response only included UUIDs specific to rented instances and omitted the corresponding UUIDs for the same movies in the store's database. To resolve this discrepancy, the correspondence between rented and store movies was established based solely on their matching titles. This approach ensured accurate tracking and management of rented movie instances.

## Known issues

For security reasons, this application stores refresh and access JSON Web Tokens (JWTs) in memory rather than in localStorage or sessionStorage. This decision helps mitigate risks associated with client-side storage vulnerabilities. Additionally, exploring the creation of a custom sessionCookie that can securely interact with these JWTs is an ongoing area of research and development. Further investigation into best practices and implementation details is required to enhance session management and security measures.
