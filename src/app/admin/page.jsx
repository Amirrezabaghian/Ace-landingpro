"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabaseClient';
import RecentWorksList from './components/RecentWorksList';
import UploadWorkForm from './components/UploadWorkForm';
import DesignersPage from './components/DesignersPage';
import './admin.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('works'); 
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. بررسی وضعیت لاگین کاربر
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // اگر کاربر لاگین نبود، به صفحه لاگین هدایت شود
        router.push('/admin/login');
      } else {
        setSession(session);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  // 2. تابع خروج (Logout)
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // اگر در حال چک کردن وضعیت بودیم، یک پیام ساده نشان بده
  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8f7f5', color: '#666' }}>
        Verifying access...
      </div>
    );
  }

  // اگر لاگین نبودیم، چیزی رندر نشود (چون در حال ریدایرکت هستیم)
  if (!session) return null;

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: '#f8f7f5' }}>
      
      {/* ══ Sidebar ══ */}
      <aside className="admin-sidebar" style={sidebarStyle}>
        <div style={logoStyle}>ACE STUDIO</div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <button onClick={() => setActiveTab('works')} style={navBtnStyle(activeTab === 'works')}>
            Recent Works
          </button>
          <button onClick={() => setActiveTab('upload')} style={navBtnStyle(activeTab === 'upload')}>
            + Upload New
          </button>
          <button onClick={() => setActiveTab('designers')} style={navBtnStyle(activeTab === 'designers')}>
            Designers
          </button>
        </nav>

        {/* دکمه خروج در پایین سایدبار */}
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </aside>

      {/* ══ Main Content ══ */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {activeTab === 'works' && <RecentWorksList />}
        {activeTab === 'upload' && <UploadWorkForm onSuccess={() => setActiveTab('works')} />}
        {activeTab === 'designers' && <DesignersPage />}
      </main>

    </div>
  );
}

// ══ Styles ══
const sidebarStyle = { 
  width: '240px', 
  background: '#fff', 
  borderRight: '1px solid #eee', 
  padding: '30px 20px', 
  position: 'sticky', 
  top: 0, 
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
};

const logoStyle = { 
  fontWeight: 'bold', 
  letterSpacing: '2px', 
  marginBottom: '40px', 
  fontSize: '14px', 
  color: '#1a1a1a' 
};

const navBtnStyle = (active) => ({
  padding: '12px 16px', 
  borderRadius: '12px', 
  border: 'none', 
  textAlign: 'left', 
  cursor: 'pointer',
  background: active ? '#1a1a1a' : 'transparent', 
  color: active ? '#fff' : '#666',
  fontSize: '13px', 
  fontWeight: '500', 
  transition: '0.2s'
});

const logoutBtnStyle = {
  marginTop: 'auto',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid #eee',
  background: 'transparent',
  color: '#ff4d4d',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500'
};