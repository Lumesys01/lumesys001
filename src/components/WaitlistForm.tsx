
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { DirectionalHint } from './ui/MicroInteractions';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

// Define the possible response types
interface SuccessResponse {
  success: boolean;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

const WaitlistForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Add visual feedback
      sonnerToast.loading('Submitting your information...', { 
        id: 'waitlist-submission',
        duration: 10000
      });
      
      // Log the data being sent
      console.log('Preparing to submit data:', data);
      
      const response = await fetch('/functions/v1/collect-waitlist-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      
      // Get the text response first
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      // Only try to parse JSON if we have content
      let result: ApiResponse = { success: false };
      if (responseText && responseText.trim()) {
        try {
          result = JSON.parse(responseText) as ApiResponse;
          console.log('Parsed response:', result);
        } catch (parseError) {
          console.error('Error parsing response as JSON:', parseError);
          throw new Error('Invalid server response format');
        }
      }

      sonnerToast.dismiss('waitlist-submission');
      
      if (response.ok) {
        form.reset();
        localStorage.setItem('waitlist_joined', 'true');
        
        sonnerToast.success('Joined waitlist successfully!');
        toast({
          title: "You've joined the waitlist!",
          description: "We'll be in touch soon with exclusive updates.",
          variant: "default",
        });
      } else {
        console.error('Server returned error:', response.status, result);
        const errorMessage = 'error' in result ? result.error : 'Signup failed';
        throw new Error(errorMessage);
      }
    } catch (error) {
      sonnerToast.dismiss('waitlist-submission');
      sonnerToast.error('Something went wrong');
      
      console.error('Submission error:', error);
      
      toast({
        title: "Signup Error",
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 shadow-xl relative overflow-hidden mb-10">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 border border-highlight/20 rounded-2xl glow-border"></div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="relative z-10 flex flex-col space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black text-sm font-medium">First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John"
                      className="px-4 py-3 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black text-sm font-medium">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Doe"
                      className="px-4 py-3 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-sm font-medium">Company (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Acme Corp"
                    className="px-4 py-3 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-black"
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
                <FormLabel className="text-black text-sm font-medium">Email Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="john@example.com"
                    className="px-4 py-3 rounded-full border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DirectionalHint direction="right" className="self-end mt-2">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="glow-button text-primary font-medium px-8 py-4 rounded-full text-lg shadow-[0_0_15px_rgba(0,191,114,0.5)] hover:shadow-[0_0_25px_rgba(0,191,114,0.7)] transition-all duration-300"
            >
              {isSubmitting ? "Processing..." : "Join the Waitlist"}
            </Button>
          </DirectionalHint>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-accent/10 mt-6">
            <p className="text-sm font-medium text-black mb-2">When you join, you'll get:</p>
            <ul className="space-y-2 text-sm">
              {[
                "Early access to our platform before public launch",
                "Personalized onboarding session with our team",
                "Direct input on future feature development"
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 mt-0.5 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-sm text-center text-black font-medium">By joining, you agree to receive updates about Lumesys. We respect your privacy.</p>
        </form>
      </Form>
    </div>
  );
};

export default WaitlistForm;
