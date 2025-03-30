
import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Please enter your full name.",
  }),
  companyName: z.string().min(2, {
    message: "Please enter your company name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ClientContactForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
    },
  });

  function onSubmit(data: FormValues) {
    // In a real app, this would send the data to your backend
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      
      // Show success message
      toast({
        title: "Contact request submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });

      setIsSubmitted(true);
    }, 1500);
  }

  const handleLinkedInConnect = () => {
    // Replace with your actual LinkedIn profile URL
    window.open("https://www.linkedin.com/in/yourprofile/", "_blank");
  };

  return (
    <section id="client-contact" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 mb-4 rounded-full bg-accent/10 text-accent/90 text-sm font-medium">
            Get Started
          </span>
          <h2 className="text-3xl md:text-5xl font-light mb-4">
            Connect With <span className="gradient-text font-normal">Our Team</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Let's discuss how Lumesys can help your organization achieve significant energy savings.
          </p>
        </div>
        
        <div className="max-w-md mx-auto relative">
          {/* Add decorative elements */}
          <div className="absolute -top-6 -left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-highlight/10 rounded-full blur-xl"></div>
          
          <Card className="neo-card border-t-4 border-accent shadow-lg relative z-10 overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-accent/5 pointer-events-none"></div>
            
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span>Request Information</span>
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></div>
              </CardTitle>
              <CardDescription className="text-black/70">
                Fill out this form to learn more about our solutions.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              {!isSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Jane Doe" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Acme Corp" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="jane@example.com" 
                              type="email" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full glow-button text-primary font-medium mt-2 relative group overflow-hidden"
                    >
                      <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                        {isSubmitting ? (
                          <>
                            <span className="animate-pulse">Processing</span>
                            <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                          </>
                        ) : (
                          <>
                            Submit Request
                            <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="py-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <CheckCircle className="h-16 w-16 text-green-500 animate-scale-in" />
                      <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2 animate-fade-in">Thank You!</h3>
                  <p className="text-black/70 mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
                    Your information has been submitted successfully. Our team will contact you shortly.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button 
                variant="outline" 
                className="glow-border text-black/80 flex items-center gap-2 hover:bg-accent/5 transition-all duration-300 group"
                onClick={handleLinkedInConnect}
              >
                <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Connect with our Founder
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ClientContactForm;
