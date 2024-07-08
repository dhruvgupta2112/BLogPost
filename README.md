# BlogPost

BlogPost is a full-featured blogging platform that allows users to post blogs, view other blogs, like and comment on blogs, sign up/sign in, and manage their content. It supports multiple users and is built using modern web technologies.

## Features

- **Post Blogs**: Share your thoughts and insights by posting blogs.
- **View Blogs**: Browse and read blogs posted by other users.
- **Like Blogs**: Show appreciation for well-written blogs.
- **Comment on Blogs**: Engage with other users by commenting on blogs.
- **User Authentication**: Sign up and sign in to manage your blogs and comments.
- **Delete Blogs**: Remove your own blogs when needed.
- **Delete Comments**: Manage and delete your comments.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, React
- **Backend**: Node.js, Express
- **Database**: MySQL

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- MySQL server installed and running
- Node.js installed
- npm installed

### Installation

1. **Download and Extract the Project**
   
   Download the project files and extract them to your desired directory.

2. **Configure MySQL**
   
   Ensure you have a MySQL server running and a database created for the project. Open the file `config/config.js` and update the `development` object with your MySQL server information.

   ```javascript
   module.exports = {
     development: {
       username: "your-username",
       password: "your-password",
       database: "your-database-name",
       host: "127.0.0.1",
       dialect: "mysql"
     },
     // other environments...
   };

## Running the Application

1. **Running the Client**

   Open a terminal and navigate to the client directory.
   Run the following commands:

   ```
   npm install
   npm start
   ```
   The client should now be running on http://localhost:3000.

Running the Server

2. **Open a terminal and navigate to the server directory.**

   Run the following commands:

   ```
   npm install
   npm start
   ```
   The server should now be running on http://localhost:5000.


