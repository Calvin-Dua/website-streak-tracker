import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {

  // Security check
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Use service role client — needed to read user emails
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // Get current hour in HH:00 format
  const now = new Date()
  const currentHour = `${String(now.getUTCHours()).padStart(2, '0')}:00`
  const today = now.toISOString().split('T')[0]

  console.log(`Running reminders for hour: ${currentHour}, date: ${today}`)

  // Find all goals with reminders set for this hour
  const { data: goals, error: goalsError } = await supabase
    .from('goals')
    .select('id, website_name, website_url, target_days, reminder_time, user_id')
    .eq('reminder_time', currentHour)

  if (goalsError) {
    console.error('Error fetching goals:', goalsError)
    return NextResponse.json({ error: goalsError.message }, { status: 500 })
  }

  if (!goals || goals.length === 0) {
    return NextResponse.json({ message: 'No reminders to send', currentHour })
  }

  console.log(`Found ${goals.length} goals with reminders for ${currentHour}`)

  const results = []

  for (const goal of goals) {
    // Check if already visited today
    const { data: visitLog } = await supabase
      .from('visit_logs')
      .select('id')
      .eq('goal_id', goal.id)
      .eq('visited_at', today)
      .single()

    // Already visited — skip
    if (visitLog) {
      console.log(`${goal.website_name} already visited today — skipping`)
      continue
    }

    // Get user email
    const { data: userData } = await supabase.auth.admin.getUserById(goal.user_id)
    const email = userData?.user?.email

    if (!email) {
      console.log(`No email found for user ${goal.user_id} — skipping`)
      continue
    }

    // Send reminder email via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Streakly <onboarding@resend.dev>',
        to: email,
        subject: `🔥 Don't break your ${goal.website_name} streak!`,
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #fafaf8; border-radius: 16px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #e8845a, #c17344); border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; font-size: 28px;">
                🔥
              </div>
            </div>
            <h1 style="font-size: 24px; color: #3d1f0a; margin-bottom: 8px; text-align: center;">
              Streak reminder
            </h1>
            <p style="font-size: 16px; color: #7a4a2e; margin-bottom: 8px; text-align: center;">
              You haven't logged your visit to
            </p>
            <p style="font-size: 20px; font-weight: 700; color: #3d1f0a; margin-bottom: 24px; text-align: center;">
              ${goal.website_name}
            </p>
            <p style="font-size: 15px; color: #7a4a2e; margin-bottom: 32px; text-align: center;">
              Don't break your streak! Log your visit now before the day ends.
            </p>
            <div style="text-align: center;">
              
                href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard"
                style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #e8845a, #c17344); color: #fff; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px;"
              >
                Log my visit now →
              </a>
            </div>
            <p style="font-size: 13px; color: #7a4a2e88; margin-top: 32px; text-align: center;">
              You're receiving this because you set a reminder for ${goal.website_name} on Streakly.
            </p>
          </div>
        `,
      }),
    })

    const emailData = await emailRes.json()
    console.log(`Email sent to ${email}:`, emailData)

    results.push({
      goal: goal.website_name,
      email,
      sent: emailRes.ok,
    })
  }

  return NextResponse.json({
    success: true,
    sent: results.length,
    results,
    currentHour,
  })
}