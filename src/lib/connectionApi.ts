// lib/connectionApi.ts
import { supabase } from './supabase'

export const fetchConnections = async () => {
  const { data, error } = await supabase.from('connections').select('*')
  if (error) throw error
  return data.map((conn) => ({
    id: conn.id,
    fromId: conn.from_id,
    toId: conn.to_id,
  }));
};

export const insertConnection = async (connection: {
  id: string
  fromId: string
  toId: string
}) => {
  const { data, error } = await supabase.from('connections').insert([
    {
      id: connection.id,
      from_id: connection.fromId,
      to_id: connection.toId,
    }
  ]);

  if (error) {
    console.error('❌ insertConnection error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }

  console.log('✅ insertConnection success:', data);
};


export const deleteConnection = async (id: string) => {
  const { error } = await supabase.from('connections').delete().eq('id', id)
  if (error) throw error
}
