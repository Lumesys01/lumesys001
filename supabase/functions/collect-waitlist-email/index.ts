
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
        company: company || null 
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
          <h1>New Waitlist Signup</h1>
          <p>A new user has joined the Lumesys pilot program waitlist:</p>
          <p><strong>Name:</strong> ${firstName || ''} ${lastName || ''}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
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
          <h1>Thank You for Joining the Lumesys Pilot Program!</h1>
          <p>Hi${firstName ? ' ' + firstName : ''},</p>
          <p>We're excited that you've expressed interest in the Lumesys pilot program. You'll be among the first to experience our AI-powered energy optimization solutions.</p>
          <p>We'll be in touch soon with more details about the upcoming launch.</p>
          <br>
          <p>Best regards,<br>The Lumesys Team</p>
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
