'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Create a new goal
export async function createGoal(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const website_url = formData.get('website_url') as string
  const website_name = formData.get('website_name') as string
  const target_days = parseInt(formData.get('target_days') as string)
  const reminder_time = formData.get('reminder_time') as string || null

  if (!website_url || !website_name || !target_days) {
    return { error: 'All fields are required' }
  }

  const { error } = await supabase.from('goals').insert({
    user_id: user.id,
    website_url,
    website_name,
    target_days,
    reminder_time: reminder_time || null,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
}

// Log a visit for today
export async function logVisit(goalId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('visit_logs').insert({
    goal_id: goalId,
    user_id: user.id,
    visited_at: today,
  })

  if (error) {
    if (error.code === '23505') {
      return { error: 'Already logged today' }
    }
    return { error: error.message }
  }

  revalidatePath('/dashboard')
}

// Delete a goal
export async function deleteGoal(goalId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', goalId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
}