import { supabase } from './supabase'

export const fetchNotes = async () => {
  const { data, error } = await supabase.from('notes').select('*')
  if (error) throw error
  return data
}

export const insertNote = async ({
  id,
  text,
  x,
  y,
}: {
  id: string
  text: string
  x: number
  y: number
}) => {
  const { error } = await supabase.from('notes').insert([{ id, text, x, y }])
  if (error) throw error
}

export const deleteNote = async (id: string) => {
  const { error } = await supabase.from('notes').delete().eq('id', id)
  if (error) throw error
}

export const deleteConnection = async (id: string) => {
  const { error } = await supabase.from('connections').delete().eq('id', id)
  if (error) throw error
}

export const updateNote = async (id: string, updates: Partial<{ text: string; x: number; y: number }>) => {
  const { error } = await supabase.from('notes').update(updates).eq('id', id)
  if (error) throw error
}
