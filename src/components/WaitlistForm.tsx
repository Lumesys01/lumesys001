import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from './ui/use-toast';
import { z } from 'zod';
import { Check, Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(2, { message: "Company name is required" }),
  role: z.string().min(2, { message: "Role is required" }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const submitToWaitlist = async (data: FormData) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve();
      } else {
        reject(new Error("Failed to submit. Please try again."));
      }
    }, 1500);
  });
};

const sendTeamNotification = async (data: FormData) => {
  console.log("Sending notification email to team at info@golumesys.com", data);
  return Promise.resolve();
};

const sendUserConfirmation = async (email: string, name: string) => {
  console.log(`Sending confirmation email to ${name} at ${email}`);
  return Promise.resolve();
};

const WaitlistForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    role: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      formSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }
    
    setIsSubmitting(true);
    setSubmitStatus('submitting');
    
    try {
      await submitToWaitlist(formData);
      
      await Promise.all([
        sendTeamNotification(formData),
        sendUserConfirmation(formData.email, formData.fullName)
      ]);
      
      toast({
        title: "Success! 🎉",
        description: "You've been added to our waitlist. We'll be in touch soon!",
        variant: "default",
      });
      
      setFormData({
        fullName: '',
        email: '',
        company: '',
        role: '',
        message: '',
      });
      
      setSubmitStatus('success');
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="text-center mb-10">
        <motion.h2 
          className="text-3xl font-bold mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join Our <span className="text-accent">Exclusive</span> Pilot Program
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Be among the first to experience the future of energy management. Limited spots available.
        </motion.p>
      </div>
      
      <motion.div
        className="bg-white dark:bg-gray-900/50 shadow-lg rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                name="fullName" 
                placeholder="John Doe" 
                value={formData.fullName}
                onChange={handleChange}
                className={cn(errors.fullName && "border-red-500")}
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="you@company.com" 
                value={formData.email}
                onChange={handleChange}
                className={cn(errors.email && "border-red-500")}
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                name="company" 
                placeholder="Your Company" 
                value={formData.company}
                onChange={handleChange}
                className={cn(errors.company && "border-red-500")}
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Input 
                id="role" 
                name="role" 
                placeholder="e.g. Facility Manager, CFO" 
                value={formData.role}
                onChange={handleChange}
                className={cn(errors.role && "border-red-500")}
                disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              />
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Why are you interested in Lumesys? (Optional)</Label>
            <Textarea 
              id="message" 
              name="message" 
              placeholder="Tell us about your energy management challenges..."
              value={formData.message}
              onChange={handleChange}
              disabled={submitStatus === 'submitting' || submitStatus === 'success'}
              className="resize-none min-h-[120px]"
            />
          </div>
          
          <div className="pt-2">
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center py-2 text-accent"
                >
                  <Check className="mr-2 h-5 w-5" />
                  <span>Your application has been submitted!</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-end"
                >
                  <Button 
                    type="submit" 
                    className="px-8 py-6 bg-gradient-to-r from-accent to-highlight hover:from-highlight hover:to-accent text-white transition-all duration-300 rounded-full flex items-center group"
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <span>Apply for Pilot Program</span>
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default WaitlistForm;
