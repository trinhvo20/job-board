# Job Board Application

A modern job board application built with Next.js, React, and MongoDB. This application allows users to post job listings, search for jobs, and view job details. It also provides features for job creation and editing, including rich search functionality and user authentication.

## Features

- **Job Listings**: Browse and search for job listings.
- **Search Functionality**: Search jobs by title and description.
- **Job Posting**: Post new job listings with details like title, type, salary, location, and contact information.
- **Job Editing**: Edit existing job listings.
- **User Authentication**: Secure access to certain pages and features.
- **Responsive Design**: Works on both desktop and mobile devices.

## Libraries and Tools
- **TypeScript**: Language for the application
- **Next.js**: Framework for React applications.
- **WorkOS**: For user authentication.
- **Radix UI**: Component library for UI elements.
- **AWS S3**: For storing company logos.
- **MongoDB**: Database for saving job listings.
- **React Icons**: For incorporating icons.
- **React Country State City**: For dropdown selections of geographical locations.
- **React TimeAgo**: For displaying timestamps.

## Deployment

The application is deployed using the **Vercel platform**. You can access the live version of the job board application at:

[https://job-board-peach-three.vercel.app/](https://job-board-peach-three.vercel.app/)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- pnpm
- MongoDB (Atlas)
- AWS account

### Steps

#### 1. Clone the repository

   ```bash
   git clone https://github.com/trinhvo20/job-board.git
   ```
#### 2. Install dependencies

   ```bash
   pnpm install
   ```
#### 3. AWS S3 Setup
- Create an S3 bucket in the AWS Management Console.
- Create an IAM user with S3 permissions and note the access key and secret access key.
- Add these credentials to your `.env` file.

#### 4. MongoDB Setup
- Create a MongoDB cluster (on Atlas) and obtain the connection URI.
- Add the URI to your .env file.

#### 5. Set up environment variables in `.env`
   ```
   # workos.com (for authentication)
   WORKOS_CLIENT_ID=
   WORKOS_API_KEY=
   WORKOS_REDIRECT_URI=
   WORKOS_COOKIE_PASSWORD=

   # AWS S3
   S3_BUCKET=
   S3_ACCESS_KEY=
   S3_SECRET_KEY=

   # MongoDB
   MONGODB_URI=
   ```
#### 6. Run the Development Server
   ```bash
   pnpm dev
   ```
   Access the application at http://localhost:3000.

## Author
Trinh Vo