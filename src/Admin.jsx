import React, { useState } from 'react';

export default function Admin() {
  const [type, setType] = useState('single'); // اولش روی حالت تکی باشد

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontWeight: '200' }}>مدیریت <span style={{ fontWeight: 'bold' }}>پروژه‌ها</span></h1>
      
      {/* دکمه‌های انتخاب حالت */}
      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setType('single')} style={btnStyle(type === 'single')}>حالت تکی</button>
        <button onClick={() => setType('double')} style={btnStyle(type === 'double')}>حالت دوتایی (جفت)</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: type === 'double' ? '1fr 1fr' : '1fr', gap: '20px' }}>
        {/* فرم اول */}
        <div style={cardStyle}>
          <h3>اطلاعات پروژه {type === 'double' ? 'اول' : ''}</h3>
          <input type="file" style={inputStyle} />
          <input placeholder="اسم پروژه" style={inputStyle} />
          <input placeholder="اسم کلاینت" style={inputStyle} />
        </div>

        {/* فرم دوم (فقط اگر حالت دوتایی انتخاب شود نمایش داده می‌شود) */}
        {type === 'double' && (
          <div style={cardStyle}>
            <h3>اطلاعات پروژه دوم</h3>
            <input type="file" style={inputStyle} />
            <input placeholder="اسم پروژه" style={inputStyle} />
            <input placeholder="اسم کلاینت" style={inputStyle} />
          </div>
        )}
      </div>

      <button style={publishBtnStyle}>انتشار در سایت</button>
    </div>
  );
}

// استایل‌های ساده برای اینکه فعلاً ظاهر کار را ببینی
const cardStyle = { background: '#f9f9f9', padding: '25px', borderRadius: '30px', border: '1px solid #eee' };
const inputStyle = { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '12px', border: '1px solid #ddd', display: 'block' };
const btnStyle = (active) => ({ padding: '10px 20px', borderRadius: '15px', border: 'none', backgroundColor: active ? '#000' : '#eee', color: active ? '#fff' : '#000', cursor: 'pointer' });
const publishBtnStyle = { marginTop: '30px', width: '100%', padding: '20px', backgroundColor: '#000', color: '#fff', borderRadius: '25px', border: 'none', fontSize: '18px', cursor: 'pointer' };