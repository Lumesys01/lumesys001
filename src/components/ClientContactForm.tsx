
import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Linkedin } from "lucide-react";
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
    console.log(data);
    
    // Show success message
    toast({
      title: "Contact request submitted!",
      description: "Thank you for your interest. We'll be in touch soon.",
    });

    setIsSubmitted(true);
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
        
        <div className="max-w-md mx-auto">
          <Card className="neo-card border-t-4 border-accent shadow-lg">
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
              <CardDescription>
                Fill out this form to learn more about our solutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                            <Input placeholder="Jane Doe" {...field} />
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
                            <Input placeholder="Acme Corp" {...field} />
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
                            <Input placeholder="jane@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full glow-button text-primary font-medium"
                    >
                      Submit Request
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="py-6 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                  <p className="text-black/70 mb-4">
                    Your information has been submitted successfully. Our team will contact you shortly.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button 
                variant="outline" 
                className="glow-border text-black/80 flex items-center gap-2 hover:bg-accent/5"
                onClick={handleLinkedInConnect}
              >
                <Linkedin className="h-5 w-5" />
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
