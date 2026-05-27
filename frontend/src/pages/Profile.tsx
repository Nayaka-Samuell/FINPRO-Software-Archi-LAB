import { useState, useEffect, useContext } from 'react';
import { profileApi } from '../api';
import { AuthContext } from '../context/AuthContext';
import { toast } from '../components/Toast';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.get();
        setProfile(data);
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-2 border-blue-electric border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-65px)] bg-chalk-off">
      {/* Page Header */}
      <div
        className="relative bg-blue-electric py-16 px-6 overflow-hidden"
        style={{ backgroundImage: "url('/background.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative z-10 container mx-auto max-w-2xl">
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-3">My Account</p>
          <h1 className="text-6xl md:text-7xl font-black uppercase leading-none tracking-tighter text-white">
            PROFILE
          </h1>
        </div>
      </div>

      <div className="px-6 py-16">
        <div className="container mx-auto max-w-2xl">
        
        <div className="bg-white border border-chalk-muted shadow-sm p-8 md:p-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12 pb-12 border-b border-chalk-muted">
            <div className="h-32 w-32 bg-blue-electric flex items-center justify-center text-white text-5xl font-black">
              {profile?.first_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-ink mb-2">
                {profile ? `${profile.first_name} ${profile.last_name}` : 'User'}
              </h2>
              <p className="text-ink-muted font-medium mb-4">{user?.email}</p>
              <span className="inline-block border border-blue-electric text-blue-electric text-xs font-bold uppercase tracking-widest px-3 py-1">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-4">Account Details</h3>
            {profile ? (
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-ink-muted mb-2">First Name</span>
                  <span className="font-bold text-ink text-lg">{profile.first_name}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-ink-muted mb-2">Last Name</span>
                  <span className="font-bold text-ink text-lg">{profile.last_name}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="block text-xs font-bold uppercase tracking-widest text-ink-muted mb-2">Email</span>
                  <span className="font-bold text-ink text-lg">{user?.email}</span>
                </div>
              </div>
            ) : (
              <p className="text-ink-muted font-medium">Profile details not found.</p>
            )}
            
            <div className="pt-10 mt-10 border-t border-chalk-muted flex justify-center sm:justify-start">
              <button onClick={() => { logout(); window.location.href = '/'; }} className="btn-outline text-xs">
                Logout
              </button>
            </div>
          </div>{/* end space-y-6 */}
        </div>{/* end card */}
        </div>{/* end container */}
      </div>{/* end px-6 py-16 */}
    </div>
  );
};

export default Profile;
