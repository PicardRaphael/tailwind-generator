# Tailwind Generator

This application, named "tailwind-generator", utilizes OpenAI's API to generate HTML code with Tailwind CSS based on user inputs. Built with Vanilla TypeScript, it offers an efficient way to create dynamic, responsive web designs.

## Features

- Generates HTML code with Tailwind CSS through OpenAI's API.
- Simple user interface for inputting design requirements.
- Utilizes modern web technologies including TypeScript and Tailwind CSS.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20.4.0 or later).

## Installation

Clone the repository and navigate to the project directory:

```sh
git clone <https://github.com/PicardRaphael/tailwind-generator>
cd tailwind-generator
npm install
```

Dependencies include:

Tailwind CSS
TypeScript
Vite
OpenAI SDK
Create a .env file at the root of your project with your OpenAI API key:

```env
VITE_OPENAI_API_KEY=your_api_key_here
```

Obtain an API key from [OpenAI](https://platform.openai.com/docs/overview).

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the project for production.
- `npm run preview`: Serves the built application for preview.

## Usage

After setup, input your design requirements into the app. It will use OpenAI's API to generate HTML code with Tailwind CSS, suitable for your web projects.
