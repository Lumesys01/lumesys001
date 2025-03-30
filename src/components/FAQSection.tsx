
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How quickly can I see results after implementing Lumesys?",
      answer: "Most clients see measurable energy savings within the first 30 days. Our system begins learning immediately upon installation and starts making optimization recommendations within the first week. Full AI-driven automation is typically achieved within 60-90 days, depending on your system complexity."
    },
    {
      question: "Do I need to replace my existing energy management system?",
      answer: "No, Lumesys is designed to integrate with your existing infrastructure. Our platform works as a layer on top of your current systems, enhancing their capabilities with AI-powered analytics and controls without requiring replacement of your existing hardware."
    },
    {
      question: "How is Lumesys different from other energy management solutions?",
      answer: "Unlike traditional systems that rely on static schedules and manual adjustments, Lumesys uses advanced machine learning algorithms that continuously adapt to your facility's unique patterns. Our predictive capabilities and real-time optimization deliver significantly higher energy savings compared to conventional systems."
    },
    {
      question: "Is Lumesys suitable for my industry?",
      answer: "Lumesys is designed for medium to large facilities across multiple industries including manufacturing, commercial real estate, healthcare, data centers, and educational institutions. Any facility with complex energy systems and annual energy costs exceeding $100,000 can benefit significantly from our solution."
    },
    {
      question: "How secure is the Lumesys platform?",
      answer: "Security is paramount in our design. Lumesys employs enterprise-grade encryption, regular security audits, and follows ISO 27001 standards for information security management. All data is encrypted both in transit and at rest, and we provide detailed access controls to meet your organization's security requirements."
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            Frequently Asked <span className="gradient-text font-normal">Questions</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Get answers to common questions about Lumesys and how it can transform your energy management.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left text-black font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-black/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-black/70">
            Have more questions? <span className="text-highlight font-medium cursor-pointer hover:underline">Contact our team</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
