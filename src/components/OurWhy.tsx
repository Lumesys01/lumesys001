
import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OurWhy = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          <span className="gradient-text">Our Why</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          The inspiration behind Lumesys and the values that drive our mission forward
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-gradient-to-br from-white to-accent/5 border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 sm:p-8 flex flex-col h-full">
            <div className="mb-5 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M12 2v8"></path>
                <path d="m4.93 10.93 1.41 1.41"></path>
                <path d="M2 18h2"></path>
                <path d="M20 18h2"></path>
                <path d="m19.07 10.93-1.41 1.41"></path>
                <path d="M22 22H2"></path>
                <path d="m16 6-4 4-4-4"></path>
                <path d="M16 18a4 4 0 0 0-8 0"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Championing Energy Efficiency</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              We believe in a future where energy is used intelligently and sustainably. 
              Our mission is to reduce wasteful energy consumption by giving buildings
              the intelligence they need to optimize usage patterns.
            </p>
            <Button variant="link" className="p-0 text-accent flex items-center w-fit group">
              Learn more <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-highlight/5 border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 sm:p-8 flex flex-col h-full">
            <div className="mb-5 w-12 h-12 bg-highlight/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Improving Business Bottom Line</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              We understand that sustainability must make economic sense. Our solutions
              are designed to deliver measurable ROI through reduced energy costs, 
              optimized building management, and improved asset performance.
            </p>
            <Button variant="link" className="p-0 text-highlight flex items-center w-fit group">
              Learn more <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-accent/5 border-0 shadow-md hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 sm:p-8 flex flex-col h-full">
            <div className="mb-5 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Upskilling Youth & Women in STEM</h3>
            <p className="text-gray-600 mb-4 flex-grow">
              We're committed to creating opportunities in tech for underrepresented groups.
              Through mentorship programs and partnerships, we actively work to bring more
              diversity into STEM fields and build a more inclusive industry.
            </p>
            <Button variant="link" className="p-0 text-accent flex items-center w-fit group">
              Learn more <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OurWhy;
