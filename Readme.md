## FRONTEND
[![React](https://img.shields.io/badge/React-%5E17.0.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%5E14.0.0-green)](https://nodejs.org/)

A brief description of your React project.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/vaibhavg4651/Attendance
cd Frontend
npm install
npm start
```

## BACKEND
## Setting Environment Variables
* Place the .env file where settings.py is located.
* change the environament variable values according to the above database settings.

## Setting Project
* Create a virtual Environment
  * virtualenv env
  * source env/bin/activate
  * pip install -r requirements.txt
* Set Database
  * python3 manage.py makemigrations
  * python3 manage.py migrate
* Create Superuser
  * python3 manage.py createsuperuser
  * enter details
* Run Server
  * python3 manage.py runserver 