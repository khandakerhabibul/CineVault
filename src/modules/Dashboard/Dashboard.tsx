import React, { useState, useRef } from 'react';
import { useAuth } from 'src/context/AuthProvider';
import { useToast } from 'src/context/ToastContext';
import { updateProfile } from 'firebase/auth';
import { auth } from 'src/firebase/firebase';
import Input from 'src/components/FormComponents/Input';
import Button from 'src/components/Button/Button';
import { User, Mail, Calendar, LogOut, Save, ShieldCheck } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Dashboard = () => {
  const { userData, handleLogout, refreshUser } = useAuth();
  const { showToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  const [displayName, setDisplayName] = useState(userData?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);

  // NOTE - Animation for entrance
  useGSAP(
    () => {
      gsap.fromTo(
        '.profile-card',
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
      );
    },
    { scope: containerRef },
  );

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setIsUpdating(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName.trim(),
      });
      await refreshUser();
      showToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      showToast(error.message || 'Failed to update profile', 'danger');
    } finally {
      setIsUpdating(false);
    }
  };

  const creationDate = userData?.metadata?.creationTime
    ? new Date(userData.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  const initials = displayName
    ? displayName
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : userData?.email?.slice(0, 2).toUpperCase() || 'CV';

  return (
    <div
      ref={containerRef}
      className='min-h-screen pt-32 pb-20 px-6 md:px-16 bg-(--bg-primary)'
    >
      <div className='max-w-4xl mx-auto'>
        <header className='mb-12 profile-card opacity-0'>
          <h1 className='text-4xl md:text-5xl font-black text-white mb-2'>
            Account Settings
          </h1>
          <p className='text-(--text-secondary) text-lg font-medium'>
            Manage your cinematic identity and account details.
          </p>
        </header>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column: Avatar & Quick Info */}
          <div className='lg:col-span-1 space-y-6'>
            <div className='profile-card opacity-0 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center'>
              <div className='relative mb-6'>
                <div className='w-32 h-32 rounded-full bg-linear-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center text-4xl font-black text-white shadow-(--glow-primary)'>
                  {initials}
                </div>
              </div>
              <h3 className='text-2xl font-bold text-white mb-1'>
                {displayName || 'User'}
              </h3>
              <p className='text-(--text-secondary) text-sm font-medium mb-6'>
                {userData?.email}
              </p>

              <div className='w-full pt-6 border-t border-white/10 space-y-4'>
                <div className='flex items-center gap-3 text-sm font-medium text-(--text-secondary)'>
                  <ShieldCheck size={18} className='text-green-500' />
                  <span>Verified Account</span>
                </div>
                <div className='flex items-center gap-3 text-sm font-medium text-(--text-secondary)'>
                  <Calendar size={18} className='text-(--color-primary)' />
                  <span>Joined {creationDate}</span>
                </div>
              </div>
            </div>

            <Button
              variant='outline'
              fullWidth
              onClick={handleLogout}
              className='profile-card opacity-0 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white'
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </Button>
          </div>

          {/* Right Column: Update Form */}
          <div className='lg:col-span-2 space-y-6'>
            <div className='profile-card opacity-0 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md'>
              <h3 className='text-2xl font-bold text-white mb-8 flex items-center gap-3'>
                <User className='text-(--color-primary)' />
                Public Profile
              </h3>

              <form onSubmit={handleUpdateProfile} className='space-y-6'>
                <div className='space-y-6'>
                  <Input
                    label='Display Name'
                    placeholder='Enter your name'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    prefix={<User size={20} />}
                    fullWidth
                  />

                  <Input
                    label='Email Address'
                    value={userData?.email || ''}
                    disabled
                    prefix={<Mail size={20} />}
                    fullWidth
                    className='opacity-60 grayscale cursor-not-allowed'
                  />
                </div>

                <div className='pt-6 border-t border-white/10 flex justify-end'>
                  <Button
                    variant='primary'
                    type='submit'
                    isLoading={isUpdating}
                    disabled={
                      isUpdating ||
                      displayName === (userData?.displayName || '')
                    }
                    className='px-8 shadow-(--glow-primary)'
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </Button>
                </div>
              </form>
            </div>

            <div className='profile-card opacity-0 p-8 rounded-2xl bg-linear-to-br from-(--color-primary)/10 to-transparent border border-(--color-primary)/20 backdrop-blur-md'>
              <h4 className='text-lg font-bold text-white mb-2'>
                CineVault Pro
              </h4>
              <p className='text-(--text-secondary) text-sm mb-4'>
                You are currently using the free tier. Upgrade to unlock premium
                features and cinematic visuals.
              </p>
              <Button size='sm' variant='success' className='font-bold'>
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
