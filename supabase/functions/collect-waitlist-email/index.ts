
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const resendApiKey = Deno.env.get('RESEND_API_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse request body
    const requestData = await req.text();
    console.log('Raw request data:', requestData);
    
    let data;
    
    try {
      data = JSON.parse(requestData);
      console.log('Parsed data:', data);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Raw request data:', requestData);
      return new Response(JSON.stringify({ error: 'Invalid JSON data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const { firstName, lastName, company, email } = data;
    console.log('Extracted data:', { firstName, lastName, company, email });

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.error('Invalid email:', email);
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized');

    // Insert all information into waitlist
    console.log('Attempting database insert...');
    const { error: insertError } = await supabase
      .from('waitlist_emails')
      .insert({ 
        email, 
        first_name: firstName || null, 
        last_name: lastName || null, 
        company: company || null,
        registered_at: new Date().toISOString() 
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to add contact information' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('Database insert successful');

    // Initialize Resend
    const resend = new Resend(resendApiKey);
    console.log('Resend client initialized');

    // Send email to internal team
    try {
      console.log('Sending internal notification email...');
      const internalEmailResult = await resend.emails.send({
        from: 'Lumesys Waitlist <onboarding@golumesys.com>',
        to: 'info@golumesys.com',
        subject: 'New Waitlist Signup',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h1 style="color: #00bf72; text-align: center;">New Waitlist Signup</h1>
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${firstName || ''} ${lastName || ''}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              ${company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${company}</p>` : ''}
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <p style="text-align: center; color: #666;">This lead has been added to your Lumesys waitlist database.</p>
          </div>
        `
      });
      console.log('Internal email sent:', internalEmailResult);
    } catch (emailError) {
      console.error('Error sending internal email:', emailError);
      // Continue execution even if internal email fails
    }

    // Send confirmation email to subscriber
    try {
      console.log('Sending confirmation email to subscriber...');
      const subscriberEmailResult = await resend.emails.send({
        from: 'Lumesys <onboarding@golumesys.com>',
        to: email,
        subject: 'Welcome to Lumesys Pilot Program Waitlist',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://www.golumesys.com/lovable-uploads/27f5da26-b388-4950-8f4b-3cc7bbf89a05.png" alt="Lumesys Logo" style="width: 80px; height: auto;">
            </div>
            <h1 style="color: #00bf72; text-align: center;">Thank You for Joining the Lumesys Pilot Program!</h1>
            <p>Hi${firstName ? ' ' + firstName : ''},</p>
            <p>We're excited that you've expressed interest in the Lumesys pilot program. You'll be among the first to experience our AI-powered energy optimization solutions.</p>
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #00bf72; font-weight: bold; margin: 0 0 10px 0;">What happens next?</p>
              <ul style="padding-left: 20px; margin: 0;">
                <li>You're now on our priority list for the pilot program</li>
                <li>We'll send you exclusive updates as we prepare for launch</li>
                <li>Our team will reach out personally when your spot becomes available</li>
              </ul>
            </div>
            <p>In the meantime, if you have any questions or would like more information, feel free to reply to this email.</p>
            <p>Best regards,<br>The Lumesys Team</p>
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
              <p>© 2025 Lumesys | <a href="https://www.golumesys.com" style="color: #00bf72; text-decoration: none;">www.golumesys.com</a></p>
            </div>
          </div>
        `
      });
      console.log('Subscriber email sent:', subscriberEmailResult);
    } catch (emailError) {
      console.error('Error sending subscriber email:', emailError);
      // Continue execution even if subscriber email fails
    }

    console.log('All operations completed successfully');
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected error occurred', details: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
