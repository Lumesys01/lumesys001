
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TeamSection = () => {
  const team = [
    {
      name: "Taryl Ogle",
      role: "Founder and CEO",
      bio: "Visionary leader with a passion for sustainable technology solutions and building diverse teams."
    },
    {
      name: "Andrew Luggya",
      role: "Non-Executive Board Member",
      bio: "Experienced advisor with extensive knowledge in corporate governance and strategic planning."
    },
    {
      name: "Thamsanqa Stinta",
      role: "Electrical Engineer",
      bio: "IoT and embedded systems specialist with expertise in sensor networks and energy monitoring."
    },
    {
      name: "Francisco Camargo",
      role: "Lead Developer",
      bio: "Experienced software architect specializing in building scalable applications and data platforms."
    },
    {
      name: "Timothy Munyao",
      role: "AWS Cloud Engineer",
      bio: "Architectural expert with deep knowledge of cloud infrastructure and deployment strategies."
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
          <Card key={index} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 relative">
              <Badge className="absolute top-0 right-6 -translate-y-1/2 bg-accent text-white border-0">
                {member.role.split(" ")[0]}
              </Badge>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{member.role}</p>
              <p className="text-gray-600 mb-4">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
