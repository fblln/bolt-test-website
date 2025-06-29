import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import LanguageTabs from '../components/LanguageTabs';

const QuickstartPage: React.FC = () => {
  const installationExamples = [
    {
      language: 'bash',
      label: 'npm/yarn',
      code: `# Install via npm
npm install @stellantis/connected-vehicles

# Or install via yarn
yarn add @stellantis/connected-vehicles`,
    },
    {
      language: 'bash',
      label: 'Python',
      code: `# Install via pip
pip install stellantis-connected-vehicles

# Or install via conda
conda install -c stellantis stellantis-connected-vehicles`,
    },
    {
      language: 'xml',
      label: 'Maven',
      code: `<dependency>
    <groupId>com.stellantis</groupId>
    <artifactId>connected-vehicles</artifactId>
    <version>1.0.0</version>
</dependency>`,
    },
    {
      language: 'gradle',
      label: 'Gradle',
      code: `implementation 'com.stellantis:connected-vehicles:1.0.0'`,
    },
  ];

  const authExamples = [
    {
      language: 'javascript',
      label: 'JavaScript',
      code: `const stellantis = require('@stellantis/connected-vehicles');

const client = new stellantis.Client({
  clientId: process.env.STELLANTIS_CLIENT_ID,
  clientSecret: process.env.STELLANTIS_CLIENT_SECRET,
  environment: 'sandbox', // Use 'production' for live data
  scopes: ['vehicle:read', 'vehicle:location', 'vehicle:control']
});

// The client handles authentication automatically
console.log('Client initialized successfully');`,
    },
    {
      language: 'python',
      label: 'Python',
      code: `import os
from stellantis_cv import Client

client = Client(
    client_id=os.environ['STELLANTIS_CLIENT_ID'],
    client_secret=os.environ['STELLANTIS_CLIENT_SECRET'],
    environment='sandbox',  # Use 'production' for live data
    scopes=['vehicle:read', 'vehicle:location', 'vehicle:control']
)

print("Client initialized successfully")`,
    },
  ];

  const firstRequestExamples = [
    {
      language: 'javascript',
      label: 'JavaScript',
      code: `// Get list of vehicles associated with the user
async function getVehicles() {
  try {
    const vehicles = await client.vehicles.list();
    console.log('Vehicles:', vehicles);
    
    if (vehicles.length > 0) {
      const vehicleId = vehicles[0].id;
      
      // Get detailed information about the first vehicle
      const vehicle = await client.vehicles.get(vehicleId);
      console.log('Vehicle details:', vehicle);
      
      // Get current location
      const location = await client.vehicles.location(vehicleId);
      console.log('Current location:', location);
      
      // Get fuel/battery status
      const fuelStatus = await client.vehicles.fuel(vehicleId);
      console.log('Fuel status:', fuelStatus);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

getVehicles();`,
    },
    {
      language: 'python',
      label: 'Python',
      code: `# Get list of vehicles associated with the user
def get_vehicles():
    try:
        vehicles = client.vehicles.list()
        print(f"Vehicles: {vehicles}")
        
        if vehicles:
            vehicle_id = vehicles[0]['id']
            
            # Get detailed information about the first vehicle
            vehicle = client.vehicles.get(vehicle_id)
            print(f"Vehicle details: {vehicle}")
            
            # Get current location
            location = client.vehicles.location(vehicle_id)
            print(f"Current location: {location}")
            
            # Get fuel/battery status
            fuel_status = client.vehicles.fuel(vehicle_id)
            print(f"Fuel status: {fuel_status}")
    except Exception as error:
        print(f"Error: {error}")

get_vehicles()`,
    },
  ];

  const steps = [
    {
      title: 'Create Developer Account',
      description: 'Sign up for a Stellantis Developer account and create your first application.',
      completed: false,
    },
    {
      title: 'Get API Credentials',
      description: 'Obtain your client ID and client secret from the developer dashboard.',
      completed: false,
    },
    {
      title: 'Install SDK',
      description: 'Install the official Stellantis Connected Vehicles SDK for your preferred language.',
      completed: false,
    },
    {
      title: 'Authenticate',
      description: 'Initialize the client with your credentials and configure authentication.',
      completed: false,
    },
    {
      title: 'Make First Request',
      description: 'Fetch your first vehicle data and explore the API capabilities.',
      completed: false,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Quick Start Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Get up and running with the Stellantis Connected Vehicles API in under 10 minutes. 
          This guide will walk you through everything you need to make your first API call.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Prerequisites
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700 dark:text-gray-300">
              A Stellantis Developer account (
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                sign up here
              </a>
              )
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700 dark:text-gray-300">
              Basic knowledge of REST APIs and HTTP requests
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-gray-700 dark:text-gray-300">
              Development environment with Node.js, Python, Java, or cURL
            </span>
          </li>
        </ul>
      </section>

      {/* Steps */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Getting Started
        </h2>

        {/* Step 1: Account Setup */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
              1
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Create Developer Account
            </h3>
          </div>
          <div className="ml-11 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              First, you'll need to create a developer account and register your application 
              to get your API credentials.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Visit the Stellantis Developer Portal</li>
              <li>Sign up for a new account or log in to your existing account</li>
              <li>Create a new application in your dashboard</li>
              <li>Choose your application type (Web, Mobile, or Server-to-Server)</li>
              <li>Configure your application settings and scopes</li>
            </ol>
          </div>
        </div>

        {/* Step 2: Installation */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
              2
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Install the SDK
            </h3>
          </div>
          <div className="ml-11 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Install the official Stellantis Connected Vehicles SDK for your preferred programming language.
            </p>
            <LanguageTabs examples={installationExamples} />
          </div>
        </div>

        {/* Step 3: Authentication */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
              3
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Configure Authentication
            </h3>
          </div>
          <div className="ml-11 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Initialize the client with your API credentials. We recommend using environment 
              variables to store your sensitive credentials.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Security Best Practice
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Never hardcode your API credentials in your source code. Use environment 
                    variables or a secure configuration management system.
                  </p>
                </div>
              </div>
            </div>
            <LanguageTabs examples={authExamples} />
          </div>
        </div>

        {/* Step 4: First Request */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
              4
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Make Your First Request
            </h3>
          </div>
          <div className="ml-11 space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Now you're ready to make your first API request! Let's start by fetching 
              the list of vehicles and getting some basic vehicle information.
            </p>
            <LanguageTabs examples={firstRequestExamples} />
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          What's Next?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/authentication"
            className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow group"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Authentication Guide
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Learn about OAuth 2.0 flows, token management, and security best practices.
            </p>
            <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-2" />
          </Link>
          
          <Link
            to="/api-reference"
            className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow group"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              API Reference
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Complete reference documentation for all API endpoints and data models.
            </p>
            <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-2" />
          </Link>
          
          <Link
            to="/webhooks"
            className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow group"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Webhooks
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Set up real-time notifications for vehicle events and status changes.
            </p>
            <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default QuickstartPage;