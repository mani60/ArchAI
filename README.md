# ArchAI - AWS Architecture Diagram Generator

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

ArchAI is an AI-powered tool that automatically generates production-grade AWS architecture diagrams based on simple text descriptions. Using OpenAI's GPT-4 model and the Python Diagrams library, ArchAI creates professional, standardized architecture visualizations that follow AWS best practices.

## Features

- **Text-to-Diagram Conversion**: Describe your architecture needs in plain English, and ArchAI will generate a complete, visual diagram
- **Production-Ready Architectures**: All generated architectures follow AWS best practices, including:
  - Multi-tier design
  - High availability across multiple AZs
  - Proper networking and security configurations
  - Scalability with auto-scaling groups
  - Defense-in-depth security model
- **Accurate Component Representation**: Every AWS service is represented using the correct icons and relationships
- **Export Options**: Save diagrams as PNG files for easy sharing and documentation

## System Architecture

ArchAI is built with a modern web architecture:

- **Frontend**: React-based web interface for entering requirements and viewing generated diagrams
- **Backend**: Node.js/Express server that interfaces with OpenAI's GPT-4 API
- **Diagram Generation**: Python scripts using the Diagrams library to create AWS architecture visualizations

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python 3.8+ with pip
- OpenAI API key

### Installation

1. Clone the repository
   ```
   git clone https://github.com/mani60/ArchAI.git
   cd ArchAI
   ```

2. Install backend dependencies
   ```
   cd Backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../Frontend
   npm install
   ```

4. Install Python dependencies
   ```
   pip install diagrams
   ```

5. Set up environment variables
   - Create a `.env` file in the Backend directory with your OpenAI API key:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```

### Running the Application

1. Start the backend server
   ```
   cd Backend
   nodemon server.js
   ```

2. Start the frontend development server
   ```
   cd Frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a description of your desired AWS architecture in the input field
   - Example: "Create a serverless web application with API Gateway, Lambda, DynamoDB, and S3 for static content hosting"

2. Click "Generate Architecture" and wait a few moments for processing

3. View the generated diagram, which will display a production-ready architecture based on your requirements

4. Download the diagram as a PNG file for your documentation

## How It Works

1. Your text description is sent to the backend server
2. The server forwards your description to the OpenAI GPT-4 API along with a specialized prompt
3. GPT-4 generates Python code using the Diagrams library
4. The backend executes the Python code to create a visual diagram
5. The diagram is sent back to the frontend for display

## Configuration

The system prompt and temperature settings can be adjusted in the backend files:

- `Backend/prompt.js` - Contains the system prompt that guides GPT-4 in generating accurate architecture diagrams
- `Backend/server.js` - Contains the temperature setting (currently set to 0.1) that controls the determinism of the output

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for providing the GPT-4 API
- [Diagrams](https://diagrams.mingrammer.com/) library for AWS architecture visualization
- All contributors to this project
