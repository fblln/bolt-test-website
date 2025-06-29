import React from 'react';
import { HelpCircle, MessageCircle, Mail, Phone, Book, Users, Clock, CheckCircle } from 'lucide-react';

const SupportPage: React.FC = () => {
  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Developer Community',
      description: 'Join our active developer community to ask questions, share solutions, and connect with other developers.',
      action: 'Join Community',
      link: '#',
      availability: '24/7',
      responseTime: 'Community-driven'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get technical support via email for integration questions, bug reports, and feature requests.',
      action: 'Send Email',
      link: 'mailto:api-support@stellantis.com',
      availability: 'Business hours',
      responseTime: '24-48 hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Direct phone support for enterprise customers and critical issues requiring immediate assistance.',
      action: 'Call Support',
      link: 'tel:+1-800-STELLANTIS',
      availability: 'Mon-Fri 9AM-6PM EST',
      responseTime: 'Immediate'
    },
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive documentation, guides, and tutorials to help you integrate and troubleshoot.',
      action: 'Browse Docs',
      link: '#',
      availability: '24/7',
      responseTime: 'Self-service'
    }
  ];

  const faqCategories = [
    {
      title: 'Getting Started',
      questions: [
        {
          question: 'How do I get API credentials?',
          answer: 'Sign up for a developer account at our developer portal, create a new application, and you\'ll receive your client ID and secret immediately.'
        },
        {
          question: 'Which vehicles are supported?',
          answer: 'We support all Stellantis brand vehicles from 2020 onwards, including Jeep, Ram, Chrysler, Dodge, Fiat, Alfa Romeo, Maserati, and Peugeot models with connected services.'
        },
        {
          question: 'Is there a sandbox environment?',
          answer: 'Yes, we provide a full sandbox environment with test vehicles and simulated data. Use api-sandbox.stellantis.com as your base URL for testing.'
        }
      ]
    },
    {
      title: 'Authentication',
      questions: [
        {
          question: 'How long do access tokens last?',
          answer: 'Access tokens are valid for 1 hour. You can use refresh tokens to obtain new access tokens without re-authenticating.'
        },
        {
          question: 'What OAuth 2.0 flows are supported?',
          answer: 'We support the Client Credentials flow for server-to-server authentication and the Authorization Code flow for user-facing applications.'
        },
        {
          question: 'How do I handle token expiration?',
          answer: 'Monitor the expires_in field in token responses and implement automatic token refresh using the refresh_token before expiration.'
        }
      ]
    },
    {
      title: 'Rate Limits',
      questions: [
        {
          question: 'What are the rate limits?',
          answer: 'Rate limits vary by endpoint: 100 req/min for vehicle data, 60 req/min for location, 10 req/min for control commands. Check response headers for current limits.'
        },
        {
          question: 'How do I handle rate limiting?',
          answer: 'Implement exponential backoff when you receive 429 responses. Use the Retry-After header to determine when to retry your request.'
        },
        {
          question: 'Can I request higher rate limits?',
          answer: 'Enterprise customers can request higher rate limits. Contact our sales team to discuss your requirements and upgrade options.'
        }
      ]
    },
    {
      title: 'Webhooks',
      questions: [
        {
          question: 'How do I verify webhook signatures?',
          answer: 'Use HMAC-SHA256 with your webhook secret to verify the X-Stellantis-Signature header. Our SDKs include helper functions for signature verification.'
        },
        {
          question: 'What happens if my webhook endpoint is down?',
          answer: 'We retry failed webhooks up to 5 times with exponential backoff over 24 hours. After that, the webhook is marked as failed.'
        },
        {
          question: 'Can I replay missed webhook events?',
          answer: 'Yes, you can retrieve missed events using our webhook logs API or request a replay of events within the last 30 days.'
        }
      ]
    }
  ];

  const resources = [
    {
      title: 'API Reference',
      description: 'Complete documentation of all endpoints, parameters, and responses.',
      link: '/api-reference'
    },
    {
      title: 'SDKs & Libraries',
      description: 'Official SDKs for popular programming languages.',
      link: '/sdks'
    },
    {
      title: 'Best Practices',
      description: 'Guidelines for building robust and efficient integrations.',
      link: '/best-practices'
    },
    {
      title: 'Status Page',
      description: 'Real-time API status and incident reports.',
      link: '/status'
    },
    {
      title: 'Changelog',
      description: 'Latest updates, new features, and breaking changes.',
      link: '/changelog'
    },
    {
      title: 'Migration Guides',
      description: 'Step-by-step guides for upgrading between API versions.',
      link: '#'
    }
  ];

  const [openFAQ, setOpenFAQ] = React.useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Support & Help
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Get the help you need to successfully integrate with the Stellantis Connected Vehicles API. 
          From documentation to direct support, we're here to help you build amazing applications.
        </p>
      </div>

      {/* Support Channels */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          How Can We Help?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportChannels.map((channel, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <channel.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {channel.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock className="h-4 w-4" />
                        <span>{channel.availability}</span>
                      </div>
                      <div>Response: {channel.responseTime}</div>
                    </div>
                    
                    <a
                      href={channel.link}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {channel.action}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {category.title}
              </h3>
              
              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => {
                  const faqId = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openFAQ === faqId;
                  
                  return (
                    <div
                      key={faqIndex}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(faqId)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                        <HelpCircle className={`h-5 w-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-600 dark:text-gray-300 pt-4">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Helpful Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow group"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {resource.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Enterprise Support */}
      <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
        <div className="text-center space-y-4">
          <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Enterprise Support
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Need dedicated support, custom SLAs, or have high-volume requirements? 
            Our enterprise support team provides personalized assistance for your business needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Dedicated Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Direct access to our engineering team</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Custom SLAs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Guaranteed response times and uptime</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Priority Features</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Influence our product roadmap</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Contact Sales
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Contact Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Technical Support
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">api-support@stellantis.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">+1-800-STELLANTIS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">Monday - Friday, 9AM - 6PM EST</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Business Inquiries
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">partnerships@stellantis.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">+1-800-BUSINESS</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">Monday - Friday, 8AM - 8PM EST</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;