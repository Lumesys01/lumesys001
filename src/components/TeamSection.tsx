
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/ui/PageTransition";
import { Users, Lightbulb, Briefcase, Code, Cloud } from "lucide-react";

const TeamSection = () => {
  const team = [
    {
      name: "Taryl Ogle",
      role: "Founder and CEO",
      bio: "Visionary leader with a passion for sustainable technology solutions and building diverse teams.",
      icon: <Users className="w-6 h-6" />
    },
    {
      name: "Andrew Luggya",
      role: "Non-Executive Board Member",
      bio: "Experienced advisor with extensive knowledge in corporate governance and strategic planning.",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      name: "Thamsanqa Stinta",
      role: "Electrical Engineer",
      bio: "IoT and embedded systems specialist with expertise in sensor networks and energy monitoring.",
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      name: "Francisco Camargo",
      role: "Lead Developer",
      bio: "Experienced software architect specializing in building scalable applications and data platforms.",
      icon: <Code className="w-6 h-6" />
    },
    {
      name: "Timothy Munyao",
      role: "AWS Cloud Engineer",
      bio: "Architectural expert with deep knowledge of cloud infrastructure and deployment strategies.",
      icon: <Cloud className="w-6 h-6" />
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          <span className="gradient-text">Meet Our Team</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          The talented individuals dedicated to transforming building energy efficiency
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {team.map((member, index) => (
          <PageTransition key={index} delay={index * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-6 relative">
                <Badge className="absolute top-0 right-6 -translate-y-1/2 bg-accent text-white border-0">
                  {member.role.split(" ")[0]}
                </Badge>
                
                <div className="mb-4 mt-2 flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/20 to-highlight/20 
                    flex items-center justify-center transform transition-all duration-500 
                    group-hover:from-accent group-hover:to-highlight group-hover:scale-110 group-hover:rotate-6">
                    <span className="text-accent group-hover:text-white transition-colors duration-300">
                      {member.icon}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-1 text-center">{member.name}</h3>
                <p className="text-sm text-gray-500 mb-3 text-center">{member.role}</p>
                <p className="text-gray-600 text-center">{member.bio}</p>
              </CardContent>
            </Card>
          </PageTransition>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
