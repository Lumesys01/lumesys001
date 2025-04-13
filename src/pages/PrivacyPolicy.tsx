
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background-dark">
      <Helmet>
        <title>Privacy Policy | Lumesys</title>
        <meta name="description" content="Lumesys privacy policy and data handling practices." />
      </Helmet>
      
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-24 md:py-32">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6">
            Last updated: April 13, 2025
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            At Lumesys, we are committed to protecting your privacy and handling your data with transparency and care. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our energy optimization platform and related services.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, information we collect automatically when you use our services, and information from third-party sources.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use your information to provide and improve our services, communicate with you, for research and development, and to comply with our legal obligations.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="mt-4">
            <strong>Email:</strong> privacy@golumesys.com<br />
            <strong>Address:</strong> Lumesys Headquarters, 123 Energy Lane, Innovation City, CA 94105
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
