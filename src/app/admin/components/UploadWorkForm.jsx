"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';

export default function UploadWorkForm({ onSuccess }) {
  const [designersList, setDesignersList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('');
  const [workType, setWorkType] = useState('single');
  const [selectedDesigners, setSelectedDesigners] = useState([]);
  
  const [selectedTools, setSelectedTools] = useState([]);
  const availableTools = ['Figma', 'Blender', 'Cinema 4D', 'After Effects', 'Photoshop', 'Illustrator', 'Spline', 'Three.js'];

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);

  useEffect(() => {
    async function fetchDesigners() {
      // دریافت لیست دیزاینرهایی که قبلاً از پنل اضافه کردی
      const { data } = await supabase.from('designers').select('*').order('name');
      if (data) setDesignersList(data);
    }
    fetchDesigners();
  }, []);

  const handleToolToggle = (tool) => {
    setSelectedTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    // آپلود در باکت پروژه‌ها
    const { error: uploadError } = await supabase.storage
      .from('projects')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('projects').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handlePublish = async () => {
    if (!title || !file1) return alert('Please add a Title and at least one Image');
    setLoading(true);

    try {
      const imgUrl1 = await uploadImage(file1);
      let imgUrl2 = null;
      if (workType === 'double' && file2) {
        imgUrl2 = await uploadImage(file2);
      }

      const { error } = await supabase.from('projects').insert([{
        title_1: title,
        client_1: client,
        year: year,
        is_double: workType === 'double',
        image_url_1: imgUrl1,
        image_url_2: imgUrl2,
        // ذخیره در ستون جدید که برای دیزاینرهای داینامیک ساختیم
        dynamic_designer_ids: selectedDesigners, 
        tools: selectedTools,
        created_at: new Date()
      }]);

      if (error) throw error;

      alert('Project Published Successfully!');
      onSuccess(); // رفرش لیست یا بستن مودال
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '25px', color: '#1a1a1a' }}>Upload New Project</h2>
      
      <div style={formCard}>
        {/* بخش اطلاعات متنی */}
        <div style={row}>
          <div style={inputGroup}><label style={labelStyle}>PROJECT TITLE</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="e.g. Branding for Ace" />
          </div>
          <div style={inputGroup}><label style={labelStyle}>CLIENT</label>
            <input type="text" value={client} onChange={e => setClient(e.target.value)} style={inputStyle} placeholder="Client Name" />
          </div>
        </div>

        <div style={row}>
          <div style={inputGroup}><label style={labelStyle}>YEAR</label>
            <input type="text" value={year} onChange={e => setYear(e.target.value)} style={inputStyle} placeholder="2024" />
          </div>
          <div style={inputGroup}><label style={labelStyle}>LAYOUT TYPE</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setWorkType('single')} style={typeBtn(workType === 'single')}>Single</button>
              <button onClick={() => setWorkType('double')} style={typeBtn(workType === 'double')}>Double</button>
            </div>
          </div>
        </div>

        {/* بخش ابزارها */}
        <div style={inputGroup}>
          <label style={labelStyle}>TOOLS USED</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {availableTools.map(tool => (
              <button 
                key={tool}
                type="button"
                onClick={() => handleToolToggle(tool)}
                style={toolBtn(selectedTools.includes(tool))}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {/* بخش آپلود عکس‌ها */}
        <div style={row}>
           <div style={inputGroup}>
              <label style={labelStyle}>IMAGE 1 {workType === 'double' && '(LEFT)'}</label>
              <div style={uploadBox}>
                {preview1 ? (
                  <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    <img src={preview1} style={imgPreview} />
                    <button onClick={() => {setFile1(null); setPreview1(null);}} style={deleteBtn}>×</button>
                  </div>
                ) : (
                  <input type="file" accept="image/*" onChange={e => handleFileChange(e, setFile1, setPreview1)} />
                )}
              </div>
           </div>
           
           {workType === 'double' && (
             <div style={inputGroup}>
                <label style={labelStyle}>IMAGE 2 (RIGHT)</label>
                <div style={uploadBox}>
                  {preview2 ? (
                    <div style={{position: 'relative', width: '100%', height: '100%'}}>
                      <img src={preview2} style={imgPreview} />
                      <button onClick={() => {setFile2(null); setPreview2(null);}} style={deleteBtn}>×</button>
                    </div>
                  ) : (
                    <input type="file" accept="image/*" onChange={e => handleFileChange(e, setFile2, setPreview2)} />
                  )}
                </div>
             </div>
           )}
        </div>

        {/* بخش انتخاب دیزاینرها از دیتابیس */}
        <div style={inputGroup}>
          <label style={labelStyle}>ASSIGN DESIGNERS (FROM DATABASE)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
            {selectedDesigners.map(id => {
              const designer = designersList.find(d => d.id === id);
              return (
                <div key={id} style={chipStyle}>
                  {designer?.avatar_url && (
                    <img src={designer.avatar_url} style={{width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px', objectFit: 'cover'}} />
                  )}
                  {designer?.name}
                  <span onClick={() => setSelectedDesigners(selectedDesigners.filter(x => x !== id))} style={{marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold'}}>×</span>
                </div>
              );
            })}
          </div>
          <select 
            style={inputStyle} 
            onChange={e => {
              const val = e.target.value;
              if (val && !selectedDesigners.includes(val)) {
                setSelectedDesigners([...selectedDesigners, val]);
              }
            }} 
            value=""
          >
            <option value="" disabled>+ Select Designer</option>
            {designersList.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <button onClick={handlePublish} disabled={loading} style={publishBtn}>
          {loading ? 'UPLOADING...' : 'PUBLISH PROJECT'}
        </button>
      </div>
    </div>
  );
}

// استایل‌ها
const formCard = { background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #eee' };
const row = { display: 'flex', gap: '20px' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, marginBottom: '20px' };
const labelStyle = { fontSize: '10px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '1px' };
const inputStyle = { padding: '14px', borderRadius: '12px', border: '1px solid #f0f0f0', background: '#f9f9f9', outline: 'none', fontSize: '14px' };
const uploadBox = { height: '180px', background: '#f9f9f9', border: '2px dashed #eee', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' };
const imgPreview = { width: '100%', height: '100%', objectFit: 'cover' };
const deleteBtn = { position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer' };
const chipStyle = { background: '#f0f0f0', color: '#1a1a1a', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0' };
const typeBtn = (active) => ({ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: active ? '#1a1a1a' : '#f0f0f0', color: active ? '#fff' : '#666', cursor: 'pointer', fontWeight: '700', transition: '0.3s' });
const toolBtn = (active) => ({ padding: '8px 16px', borderRadius: '8px', border: '1px solid', background: active ? '#1a1a1a' : '#fff', color: active ? '#fff' : '#1a1a1a', cursor: 'pointer', fontSize: '12px', transition: '0.2s', borderColor: '#1a1a1a' });
const publishBtn = { width: '100%', padding: '18px', background: '#1a1a1a', color: '#fff', borderRadius: '16px', border: 'none', fontWeight: '800', cursor: 'pointer', marginTop: '10px', letterSpacing: '1px' };