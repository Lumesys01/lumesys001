import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle, Send, Clock, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { AttentionPulse, DirectionalHint, NotificationDot } from './ui/MicroInteractions';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseTime, setResponseTime] = useState(24); // fixed at 24 hours
  const [formStarted, setFormStarted] = useState(false);
  const [exitIntent, setExitIntent] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    const values = form.getValues();
    if (values.fullName || values.companyName || values.email || values.message) {
      setFormStarted(true);
    }
  }, [form.watch(), form]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (formStarted && !isSubmitted && e.clientY <= 0) {
        setExitIntent(true);
      }
    };

    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [formStarted, isSubmitted]);

  useEffect(() => {
    if (exitIntent) {
      toast({
        title: "Before you go...",
        description: "We'll respond within 24 hours during business days. Complete the form to get started with energy optimization.",
      });
      setExitIntent(false);
    }
  }, [exitIntent, toast]);

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
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
    };
    
    console.log("Sending email data:", emailData);
    
    setTimeout(() => {
      console.log("Email sent successfully");
      setIsSubmitting(false);
      
      toast({
        title: "Contact request submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });

      setIsSubmitted(true);
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
          
          <div className="mt-4 mx-auto max-w-md flex items-center justify-center bg-accent/5 rounded-lg p-3">
            <Clock className="text-accent w-5 h-5 mr-2" />
            <p className="text-sm font-medium text-gray-700">
              Response time: <span className="text-accent">24 hours during business days</span>
            </p>
          </div>
        </div>
        
        <div className="max-w-md mx-auto relative">
          <div className="absolute -top-6 -left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-highlight/10 rounded-full blur-xl"></div>
          
          <Card className="neo-card border-t-4 border-accent shadow-lg relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-accent/5 pointer-events-none"></div>
            <div className="absolute inset-0 border border-accent/10 rounded-lg"></div>
            
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-black">
                <span>Request Information</span>
                <NotificationDot />
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
                          <FormLabel className="text-black font-medium flex items-center">
                            Full Name
                            {form.formState.dirtyFields.fullName && 
                              <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
                            }
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Jane Doe" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20 text-black"
                              onChange={(e) => {
                                field.onChange(e);
                                if (!formStarted) setFormStarted(true);
                              }}
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
                          <FormLabel className="text-black font-medium flex items-center">
                            Company Name
                            {form.formState.dirtyFields.companyName && 
                              <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
                            }
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Acme Corp" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20 text-black"
                              onChange={(e) => {
                                field.onChange(e);
                                if (!formStarted) setFormStarted(true);
                              }}
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
                          <FormLabel className="text-black font-medium flex items-center">
                            Email Address
                            {form.formState.dirtyFields.email && 
                              <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
                            }
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="jane@example.com" 
                              type="email" 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20 text-black"
                              onChange={(e) => {
                                field.onChange(e);
                                if (!formStarted) setFormStarted(true);
                              }}
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
                          <FormLabel className="text-black font-medium flex items-center">
                            Message (Optional)
                            {field.value && field.value.length > 0 && 
                              <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
                            }
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your needs..." 
                              {...field} 
                              className="transition-all duration-300 focus:border-accent focus:ring focus:ring-accent/20 text-black min-h-[100px]"
                              onChange={(e) => {
                                field.onChange(e);
                                if (!formStarted) setFormStarted(true);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <p className="text-sm text-gray-600 flex items-center justify-between">
                        <span>Form completion</span>
                        <span className="font-medium">
                          {Object.keys(form.formState.dirtyFields).length}/3 completed
                        </span>
                      </p>
                      <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-accent transition-all duration-500"
                          style={{ width: `${(Object.keys(form.formState.dirtyFields).length / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <AttentionPulse 
                      className="mt-4 w-full"
                      pulseIntensity={1.02} 
                      pulseColor="rgba(0,191,114,0.2)"
                    >
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full glow-button text-primary font-medium relative group overflow-hidden"
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
                    </AttentionPulse>
                    
                    <p className="text-xs text-center text-gray-500">
                      We'll respond within 24 hours during business days
                    </p>
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
                  
                  <div className="mt-6 bg-green-50 rounded-lg p-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
                    <p className="text-sm text-green-800 font-medium">While you wait...</p>
                    <DirectionalHint direction="right" className="text-sm text-green-700 mt-2">
                      <a href="#roi" className="flex items-center hover:text-accent transition-colors">
                        Calculate your potential savings
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </a>
                    </DirectionalHint>
                  </div>
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
