"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

export default function DesignersPage() {
  const [designers, setDesigners] = useState([]);
  const [newName, setNewName] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // متغیر برای مدیریت حالت ویرایش
  const [editingId, setEditingId] = useState(null);

  const DEFAULT_STAR_ICON = "https://img.icons8.com/fluency/96/star--v1.png";

  useEffect(() => {
    fetchDesigners();
  }, []);

  async function fetchDesigners() {
    const { data } = await supabase.from('designers').select('*').order('created_at', { ascending: false });
    if (data) setDesigners(data);
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // ورود به حالت ویرایش
  const startEdit = (designer) => {
    setEditingId(designer.id);
    setNewName(designer.name);
    setPreview(designer.avatar_url);
    setFile(null); // فایل جدید هنوز انتخاب نشده
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // لغو ویرایش
  const cancelEdit = () => {
    setEditingId(null);
    setNewName('');
    setPreview(null);
    setFile(null);
  };

  async function handleSave() {
    if (!newName) return alert('Please provide a name.');
    setLoading(true);

    try {
      let avatarUrl = preview; // آدرس قبلی (چه ستاره چه آپلود شده)

      // اگر فایل جدید انتخاب شده باشد، آپلود انجام شود
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('projects').getPublicUrl(filePath);
        avatarUrl = urlData.publicUrl;
      } else if (!editingId && !preview) {
        // اگر در حال افزودن هستیم و عکسی هم نیست، ستاره بگذار
        avatarUrl = DEFAULT_STAR_ICON;
      }

      if (editingId) {
        // عملیات ویرایش (Update)
        const { error } = await supabase
          .from('designers')
          .update({ name: newName, avatar_url: avatarUrl })
          .eq('id', editingId);
        if (error) throw error;
        alert('Designer updated!');
      } else {
        // عملیات افزودن (Insert)
        const { error } = await supabase
          .from('designers')
          .insert([{ name: newName, avatar_url: avatarUrl }]);
        if (error) throw error;
        alert('Designer added!');
      }

      cancelEdit();
      fetchDesigners();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteDesigner(id, avatarUrl) {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from('designers').delete().eq('id', id);
    if (!error) {
      if (avatarUrl && !avatarUrl.includes('icons8')) {
        const path = avatarUrl.split('/').pop();
        await supabase.storage.from('projects').remove([`avatars/${path}`]);
      }
      fetchDesigners();
    }
  }

  return (
    <div className="animate-in" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '30px' }}>
        {editingId ? 'Edit Designer' : 'Manage Designers'}
      </h2>
      
      {/* فرم ادمین */}
      <div style={{ background: editingId ? '#f0f7ff' : '#fff', padding: '25px', borderRadius: '24px', border: '1px solid #eee', marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '20px', transition: '0.3s' }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', background: '#fff', border: '2px dashed #ddd', overflow: 'hidden', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {preview ? (
              <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <img src={DEFAULT_STAR_ICON} alt="Default" style={{ width: '40px', height: '40px', opacity: 0.5 }} />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
          </div>

          <input 
            type="text" placeholder="Full Name..." value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ flex: 1, padding: '14px', border: '1px solid #eee', borderRadius: '12px', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleSave} disabled={loading}
            style={{ flex: 2, background: '#1a1a1a', color: '#fff', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
          >
            {loading ? 'Processing...' : (editingId ? 'Update Changes' : 'Add Designer')}
          </button>
          
          {editingId && (
            <button onClick={cancelEdit} style={{ flex: 1, background: '#eee', color: '#666', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* لیست دیزاینرها */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {designers.map(d => (
          <div key={d.id} style={{ background: '#fff', padding: '15px', borderRadius: '22px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={d.avatar_url} alt={d.name} style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ fontWeight: '600' }}>{d.name}</div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => startEdit(d)} style={{ border: 'none', background: '#f0f0f0', color: '#666', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                Edit
              </button>
              <button onClick={() => deleteDesigner(d.id, d.avatar_url)} style={{ border: 'none', background: '#fff0f0', color: '#ff4d4d', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}