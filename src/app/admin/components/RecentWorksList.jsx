"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

export default function RecentWorksList() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetchWorks();
  }, []);

  async function fetchWorks() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setWorks(data);
    if (error) console.error(error);
  }

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) fetchWorks();
    }
  }

  return (
    <div className="animate-in">
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '25px' }}>Recent Works</h2>
      <div style={{ display: 'grid', gap: '12px' }}>
        {works.length === 0 ? (
          <p style={{ color: '#999' }}>No projects uploaded yet.</p>
        ) : (
          works.map(work => (
            <div key={work.id} style={listCard}>
              <div style={miniThumb}>
                {work.image_url_1 && <img src={work.image_url_1} style={{width:'100%', height:'100%', objectFit:'cover'}} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>{work.title_1}</div>
                <div style={{ fontSize: '12px', color: '#999' }}>{work.client_1} • {work.is_double ? 'Double' : 'Single'}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={editBtn}>Edit</button>
                <button onClick={() => handleDelete(work.id)} style={deleteBtn}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const listCard = { background: '#fff', padding: '12px 16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #eee' };
const miniThumb = { width: '50px', height: '40px', background: '#f2f1ef', borderRadius: '8px', overflow: 'hidden' };
const editBtn = { background: '#f2f1ef', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' };
const deleteBtn = { ...editBtn, color: '#ff4d4d' };