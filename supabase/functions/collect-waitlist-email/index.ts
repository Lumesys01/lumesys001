
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
    const { email } = await req.json();

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Insert email into waitlist
    const { error: insertError } = await supabase
      .from('waitlist_emails')
      .insert({ email });

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(JSON.stringify({ error: 'Failed to add email' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

    // Send email to internal team
    await resend.emails.send({
      from: 'Lumesys Waitlist <onboarding@golumesys.com>',
      to: 'info@golumesys.com',
      subject: 'New Waitlist Signup',
      html: `
        <h1>New Waitlist Signup</h1>
        <p>A new user has joined the Lumesys pilot program waitlist:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>Date: ${new Date().toLocaleString()}</p>
      `
    });

    // Send confirmation email to subscriber
    await resend.emails.send({
      from: 'Lumesys <onboarding@golumesys.com>',
      to: email,
      subject: 'Welcome to Lumesys Pilot Program Waitlist',
      html: `
        <h1>Thank You for Joining the Lumesys Pilot Program!</h1>
        <p>Hi there,</p>
        <p>We're excited that you've expressed interest in the Lumesys pilot program. You'll be among the first to experience our AI-powered energy optimization solutions.</p>
        <p>We'll be in touch soon with more details about the upcoming launch.</p>
        <br>
        <p>Best regards,<br>The Lumesys Team</p>
      `
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
