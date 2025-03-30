
import React, { useState } from "react";
import { ArrowRightIcon, Sun, LineChart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/ui/PageTransition";

const OurWhy = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const whyItems = [
    {
      title: "Championing Energy Efficiency",
      description: "We believe in a future where energy is used intelligently and sustainably. Our mission is to reduce wasteful energy consumption by giving buildings the intelligence they need to optimize usage patterns.",
      icon: <Sun />,
      gradient: "from-accent/10 to-highlight/5",
      hoverGradient: "from-accent/20 to-highlight/10",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      title: "Improving Business Bottom Line",
      description: "We understand that sustainability must make economic sense. Our solutions are designed to deliver measurable ROI through reduced energy costs, optimized building management, and improved asset performance.",
      icon: <LineChart />,
      gradient: "from-highlight/10 to-accent/5",
      hoverGradient: "from-highlight/20 to-accent/10",
      iconBg: "bg-highlight/10",
      iconColor: "text-highlight",
    },
    {
      title: "Upskilling Youth & Women in STEM",
      description: "We're committed to creating opportunities in tech for underrepresented groups. Through mentorship programs and partnerships, we actively work to bring more diversity into STEM fields and build a more inclusive industry.",
      icon: <Users />,
      gradient: "from-accent/10 to-highlight/5",
      hoverGradient: "from-accent/20 to-highlight/10",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    }
  ];

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
        {whyItems.map((item, index) => (
          <PageTransition key={index} delay={index * 150} direction="up">
            <Card 
              className={`bg-gradient-to-br ${hoveredCard === index ? item.hoverGradient : item.gradient} border-0 shadow-md hover:shadow-lg transition-all duration-500 transform ${hoveredCard === index ? 'scale-105' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className={`mb-5 w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center transform transition-all duration-500 ${hoveredCard === index ? 'scale-110 rotate-6' : ''}`}>
                  <div className={`${item.iconColor} transform transition-all duration-500 ${hoveredCard === index ? 'scale-125' : ''}`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {item.description}
                </p>
                <Button variant="link" className={`p-0 ${item.iconColor} flex items-center w-fit group`}>
                  Learn more <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </PageTransition>
        ))}
      </div>
    </div>
  );
};

export default OurWhy;
