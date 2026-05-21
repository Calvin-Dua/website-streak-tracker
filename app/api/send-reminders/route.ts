import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

async function sendReminderEmail(
  email: string,
  goalName: string,
  siteUrl: string,
  resendKey: string
) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Streakly <onboarding@resend.dev>',
      to: email,
      subject: `🔥 Don't break your ${goalName} streak!`,
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
            ${goalName}
          </p>
          <p style="font-size: 15px; color: #7a4a2e; margin-bottom: 32px; text-align: center;">
            Don't break your streak! Log your visit now before the day ends.
          </p>
          <div style="text-align: center;">
            
              href="${siteUrl}/dashboard"
              style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #e8845a, #c17344); color: #fff; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 15px;"
            >
              Log my visit now →
            </a>
          </div>
          <p style="font-size: 13px; color: #7a4a2e88; margin-top: 32px; text-align: center;">
            You're receiving this because you set a reminder for ${goalName} on Streakly.
          </p>
        </div>
      `,
    }),
  })
  return res
}

// POST — production endpoint called by cron every hour
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  const now = new Date()
  const currentHour = `${String(now.getUTCHours()).padStart(2, '0')}:00`
  const today = now.toISOString().split('T')[0]

  const { data: goals, error: goalsError } = await supabase
    .from('goals')
    .select('id, website_name, website_url, target_days, reminder_time, user_id')
    .eq('reminder_time', currentHour)

  if (goalsError || !goals || goals.length === 0) {
    return NextResponse.json({ message: 'No reminders to send', currentHour })
  }

  const results = []

  for (const goal of goals) {
    const { data: visitLog } = await supabase
      .from('visit_logs')
      .select('id')
      .eq('goal_id', goal.id)
      .eq('visited_at', today)
      .single()

    if (visitLog) continue

    const { data: userData } = await supabase.auth.admin.getUserById(goal.user_id)
    const email = userData?.user?.email
    if (!email) continue

    const emailRes = await sendReminderEmail(
      email,
      goal.website_name,
      process.env.NEXT_PUBLIC_SITE_URL!,
      process.env.RESEND_API_KEY!
    )

    results.push({ goal: goal.website_name, email, sent: emailRes.ok })
  }

  return NextResponse.json({ success: true, sent: results.length, results, currentHour })
}

// GET — TEST ONLY, ignores hour, sends to all goals with any reminder
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  const today = new Date().toISOString().split('T')[0]

  // Fetch ALL goals with any reminder time — no hour filter
  const { data: goals, error } = await supabase
    .from('goals')
    .select('id, website_name, website_url, reminder_time, user_id')
    .not('reminder_time', 'is', null)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!goals || goals.length === 0) {
    return NextResponse.json({ message: 'No goals with reminders found' })
  }

  const results = []
  const skipped = []

  for (const goal of goals) {
    // Check if already visited today
    const { data: visitLog } = await supabase
      .from('visit_logs')
      .select('id')
      .eq('goal_id', goal.id)
      .eq('visited_at', today)
      .single()

    if (visitLog) {
      skipped.push({ goal: goal.website_name, reason: 'already visited today' })
      continue
    }

    // Get user email
    const { data: userData } = await supabase.auth.admin.getUserById(goal.user_id)
    const email = userData?.user?.email

    if (!email) {
      skipped.push({ goal: goal.website_name, reason: 'no email found' })
      continue
    }

    const emailRes = await sendReminderEmail(
      email,
      goal.website_name,
      process.env.NEXT_PUBLIC_SITE_URL!,
      process.env.RESEND_API_KEY!
    )

    const emailData = await emailRes.json()

    results.push({
      goal: goal.website_name,
      email,
      sent: emailRes.ok,
      resendResponse: emailData,
    })
  }

  return NextResponse.json({
    success: true,
    sent: results.length,
    skipped: skipped.length,
    results,
    mode: 'TEST — ignores reminder hour',
    today,
  })
}