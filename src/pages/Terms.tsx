
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <Helmet>
        <title>Terms of Service | Lumesys</title>
        <meta name="description" content="Lumesys terms of service and usage guidelines." />
      </Helmet>
      
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Last updated: April 13, 2025
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using the Lumesys platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Services</h2>
          <p>
            Lumesys provides AI-powered energy optimization solutions designed to reduce operational costs and improve building efficiency. Our services include real-time monitoring, analytics, and automated control systems.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p>
            To access certain features of our platform, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Usage and Privacy</h2>
          <p>
            Our collection and use of personal information in connection with your use of our services is described in our Privacy Policy. By using our services, you agree to our data practices as described in our Privacy Policy.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="mt-4">
            <strong>Email:</strong> legal@golumesys.com<br />
            <strong>Address:</strong> Lumesys Headquarters, 123 Energy Lane, Innovation City, CA 94105
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
