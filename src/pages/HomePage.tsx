import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Shield, Zap, Globe, Code, Users } from 'lucide-react';
import LanguageTabs from '../components/LanguageTabs';

const HomePage: React.FC = () => {
  const quickStartExamples = [
    {
      language: 'javascript',
      label: 'JavaScript',
      code: `const stellantis = require('@stellantis/connected-vehicles');

// Initialize the client
const client = new stellantis.Client({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  environment: 'production' // or 'sandbox'
});

// Get vehicle information
async function getVehicleInfo(vehicleId) {
  try {
    const vehicle = await client.vehicles.get(vehicleId);
    console.log('Vehicle Info:', vehicle);
    
    // Get current location
    const location = await client.vehicles.location(vehicleId);
    console.log('Current Location:', location);
    
    return vehicle;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    },
    {
      language: 'python',
      label: 'Python',
      code: `from stellantis_cv import Client

# Initialize the client
client = Client(
    client_id='your-client-id',
    client_secret='your-client-secret',
    environment='production'  # or 'sandbox'
)

# Get vehicle information
def get_vehicle_info(vehicle_id):
    try:
        # Get vehicle details
        vehicle = client.vehicles.get(vehicle_id)
        print(f"Vehicle Info: {vehicle}")
        
        # Get current location
        location = client.vehicles.location(vehicle_id)
        print(f"Current Location: {location}")
        
        return vehicle
    except Exception as error:
        print(f"Error: {error}")`,
    },
    {
      language: 'java',
      label: 'Java',
      code: `import com.stellantis.cv.Client;
import com.stellantis.cv.models.Vehicle;
import com.stellantis.cv.models.Location;

public class StellantisCVExample {
    private Client client;
    
    public StellantisCVExample() {
        // Initialize the client
        this.client = new Client.Builder()
            .clientId("your-client-id")
            .clientSecret("your-client-secret")
            .environment("production") // or "sandbox"
            .build();
    }
    
    public Vehicle getVehicleInfo(String vehicleId) {
        try {
            // Get vehicle information
            Vehicle vehicle = client.vehicles().get(vehicleId);
            System.out.println("Vehicle Info: " + vehicle);
            
            // Get current location
            Location location = client.vehicles().location(vehicleId);
            System.out.println("Current Location: " + location);
            
            return vehicle;
        } catch (Exception error) {
            System.err.println("Error: " + error.getMessage());
            return null;
        }
    }
}`,
    },
    {
      language: 'curl',
      label: 'cURL',
      code: `# Get access token
curl -X POST https://api.stellantis.com/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"

# Get vehicle information
curl -X GET https://api.stellantis.com/v1/vehicles/{vehicle_id} \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Accept: application/json"

# Get vehicle location
curl -X GET https://api.stellantis.com/v1/vehicles/{vehicle_id}/location \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Accept: application/json"`,
    },
  ];

  const features = [
    {
      icon: Car,
      title: 'Vehicle Data Access',
      description: 'Access real-time vehicle information including location, fuel level, battery status, and diagnostics.',
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Built with enterprise-grade security and compliance with automotive industry standards.',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Receive instant notifications through webhooks when vehicle status changes.',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Support for Stellantis vehicles across North America, Europe, and other global markets.',
    },
    {
      icon: Code,
      title: 'Developer-Friendly',
      description: 'Comprehensive SDKs, detailed documentation, and interactive API explorer.',
    },
    {
      icon: Users,
      title: 'Enterprise Ready',
      description: 'Scalable infrastructure with SLA guarantees and dedicated support.',
    },
  ];

  const useCases = [
    {
      title: 'Fleet Management',
      description: 'Track and manage your fleet vehicles with real-time location, maintenance alerts, and usage analytics.',
    },
    {
      title: 'Insurance Telematics',
      description: 'Build usage-based insurance products with driving behavior data and risk assessment tools.',
    },
    {
      title: 'Mobility Services',
      description: 'Create car-sharing, ride-hailing, and other mobility applications with vehicle control features.',
    },
    {
      title: 'Smart Parking',
      description: 'Integrate with parking systems to provide automated parking payments and space management.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Connect to the Future of
            <span className="text-blue-600 dark:text-blue-400"> Mobility</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The Stellantis Connected Vehicles API enables developers to build innovative applications 
            that connect with millions of vehicles worldwide. Access vehicle data, control features, 
            and create the next generation of automotive experiences.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/quickstart"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/api-reference"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            API Reference
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Stellantis Connected Vehicles API?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built for developers, trusted by enterprises. Our API provides the tools you need 
            to create exceptional automotive experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Example */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our intuitive API makes it easy to integrate vehicle data into your applications. 
            Choose your preferred language and start building.
          </p>
        </div>

        <LanguageTabs examples={quickStartExamples} />
      </section>

      {/* Use Cases */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Popular Use Cases
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how companies are using our API to transform the automotive industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of developers building the future of connected mobility.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/quickstart"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Building
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/support"
            className="inline-flex items-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;