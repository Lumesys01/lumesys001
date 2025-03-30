
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";

const TeamSection = () => {
  const team = [
    {
      name: "Taryl Ogle",
      role: "Founder and CEO",
      bio: "Visionary leader with a passion for sustainable technology solutions and building diverse teams.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&q=80",
      social: { linkedin: "#" }
    },
    {
      name: "Andrew Luggya",
      role: "Non-Executive Board Member",
      bio: "Experienced advisor with extensive knowledge in corporate governance and strategic planning.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&q=80",
      social: { linkedin: "#" }
    },
    {
      name: "Thamsanqa Stinta",
      role: "Electrical Engineer",
      bio: "IoT and embedded systems specialist with expertise in sensor networks and energy monitoring.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&q=80",
      social: { linkedin: "#", github: "#" }
    },
    {
      name: "Francisco Camargo",
      role: "Lead Developer",
      bio: "Experienced software architect specializing in building scalable applications and data platforms.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&q=80",
      social: { github: "#", linkedin: "#" }
    },
    {
      name: "Timothy Munyao",
      role: "AWS Cloud Engineer",
      bio: "Architectural expert with deep knowledge of cloud infrastructure and deployment strategies.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&q=80",
      social: { github: "#", linkedin: "#" }
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
            <div className="aspect-square w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 z-10"></div>
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <CardContent className="p-6 relative">
              <Badge className="absolute top-0 right-6 -translate-y-1/2 bg-accent text-white border-0">
                {member.role.split(" ")[0]}
              </Badge>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{member.role}</p>
              <p className="text-gray-600 mb-4">{member.bio}</p>
              <div className="flex items-center gap-3">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} className="text-gray-600 hover:text-accent transition-colors" aria-label={`${member.name}'s LinkedIn profile`}>
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.social.github && (
                  <a href={member.social.github} className="text-gray-600 hover:text-accent transition-colors" aria-label={`${member.name}'s GitHub profile`}>
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.social.twitter && (
                  <a href={member.social.twitter} className="text-gray-600 hover:text-accent transition-colors" aria-label={`${member.name}'s Twitter profile`}>
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                <a href="#" className="ml-auto text-accent hover:text-highlight transition-colors flex items-center gap-1 text-sm">
                  Full bio <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
