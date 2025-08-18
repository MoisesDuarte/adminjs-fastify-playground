# README

## Project Overview

This project is a Node.js application built using Fastify, TypeORM, and AdminJS. It simulates a RESTful API for managing accounts and compliance data.

## Getting Started

### Prerequisites

* Docker (version 20.10.17 or higher)
* Docker Compose (version 2.6.0 or higher)

### Installation

1. Clone the repository: `git clone https://github.com/your-repo-url.git`
2. Create a `.env` file by copying the `example.env` file: `cp example.env .env`
3. Update the environment variables in the `.env` file as needed
4. Build the Docker image: `docker-compose build`
5. Start the Docker containers: `docker-compose up`

### Running the Application

1. Access the AdminJS interface at `http://localhost:3000/admin`
2. Use `docker-compose run app ash` to access the container's shell and run commands, for example:
	* `docker-compose run app ash yarn db:migrate` to run database migrations
	* `docker-compose run app ash yarn lint` to run ESLint on the source code

## Project Structure

* `src/`: Source code directory
	+ `app.ts`: Main application file
	+ `db/`: Database configuration and migrations
	+ `resources/`: Resource definitions for AdminJS
	+ `shared/`: Shared utility functions and constants
* `dist/`: Compiled JavaScript output directory
* `node_modules/`: Dependency directory
* `.eslintrc.cjs`: ESLint configuration file
* `tsconfig.json`: TypeScript configuration file
* `docker-compose.yml`: Docker Compose definition file
* `Dockerfile`: Dockerfile for building the application image
* `example.env`: Example environment variables file

## Scripts

* `dev`: Starts the development server with `tsx watch src/app.ts`
* `lint`: Runs ESLint on the source code
* `lint:fix`: Runs ESLint with automatic fix
* `build`: Compiles the TypeScript code to JavaScript
* `start`: Starts the production server with `node dist/app.js`
* `typeorm`: Runs TypeORM CLI commands
* `db:migrate`: Runs database migrations
* `db:migrate:create`: Creates a new database migration
* `db:migrate:generate`: Generates a database migration from the current schema
* `db:migrate:revert`: Reverts the last database migration

## Dependencies

* `@adminjs/fastify`: AdminJS Fastify adapter
* `@adminjs/typeorm`: AdminJS TypeORM adapter
* `@fastify/session`: Fastify session plugin
* `adminjs`: AdminJS library
* `date-fns`: Date utility library
* `fastify`: Fastify framework
* `pg`: PostgreSQL driver
* `reflect-metadata`: Reflect metadata library
* `typeorm`: TypeORM library

## Development

* Use `docker-compose up` to start the Docker containers
* Use `docker-compose run app ash` to access the container's shell and run commands

## License

This project is licensed under the MIT License.