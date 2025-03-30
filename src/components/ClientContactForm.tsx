
import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

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
  message: z.string().optional(),
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
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // Prepare email data
    const emailData = {
      to: "info@golumesys.com",
      from: data.email,
      subject: `New Contact Request from ${data.fullName} at ${data.companyName}`,
      text: `
Name: ${data.fullName}
Company: ${data.companyName}
Email: ${data.email}
Message: ${data.message || "No message provided"}
      `,
      replyTo: data.email,
      // In a real implementation, you would include user confirmation email logic
    };
    
    // Simulate API call to send email
    console.log("Sending email data:", emailData);
    
    // In a real implementation, you would use a service like EmailJS, SendGrid, etc.
    // For now, we'll simulate a successful email send
    setTimeout(() => {
      console.log("Email sent successfully");
      setIsSubmitting(false);
      
      toast({
        title: "Contact request submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });

      setIsSubmitted(true);
      
      // Log confirmation email
      console.log("Sending confirmation email to:", data.email);
    }, 1500);
  }

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
          <div className="absolute -top-6 -left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-highlight/10 rounded-full blur-xl"></div>
          
          <Card className="neo-card border-t-4 border-accent shadow-lg relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-accent/5 pointer-events-none"></div>
            
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-black">
                <span>Request Information</span>
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></div>
              </CardTitle>
              <CardDescription className="text-black text-base">
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
                          <FormLabel className="text-black font-medium">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Jane Doe" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20 text-black"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-medium">Company Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Acme Corp" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20 text-black"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-medium">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="jane@example.com" 
                              type="email" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20 text-black"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black font-medium">Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your needs..." 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20 text-black min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
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
                  <h3 className="text-xl font-medium mb-2 animate-fade-in text-black">Thank You!</h3>
                  <p className="text-black mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
                    Your information has been submitted successfully. Our team will contact you shortly.
                  </p>
                  <p className="text-black/70 text-sm animate-fade-in" style={{ animationDelay: '400ms' }}>
                    A confirmation has been sent to your email address.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button 
                variant="outline" 
                className="text-black font-medium hover:bg-accent/5 transition-all duration-300"
                onClick={() => window.location.href = "mailto:info@golumesys.com"}
              >
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ClientContactForm;
