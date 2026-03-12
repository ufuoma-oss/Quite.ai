'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Target, 
  History, 
  Plus, 
  X,
  Search,
  FileText,
  User,
  CreditCard,
  Shield,
  LifeBuoy,
  ChevronRight,
  MoreVertical,
  Trash2,
  Camera,
  LogOut,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tab, ChatSession, Document, SettingModalType } from '@/lib/minidoc/types';
import { saveDocument } from '@/lib/minidoc/storage';

// Quitee Logo
const QuiteeLogo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14c2.876 0 5.548-.867 7.775-2.358l2.358 2.358 2.828-2.828-2.358-2.358C28.133 22.548 29 19.876 29 17h-4c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9V2z"
      fill="#10B981"
    />
    <circle cx="16" cy="16" r="6" fill="#059669" />
  </svg>
);

interface SidebarProps {
  activeTab: Tab | 'history';
  setActiveTab: (tab: Tab | 'history') => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  startNewChat: () => void;
  recentChats: ChatSession[];
  onLogout: () => void;
  onDeleteChat: (chatId: string) => void;
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  onDeleteDocument: (docId: string) => void;
  setActiveSettingModal: (modal: SettingModalType) => void;
  loadChat?: (chatId: string) => void;
  connectedAppsCount: number;
  onOpenAppModal: (appId?: string) => void;
  connectedApps: Record<string, boolean>;
  onToggleAppConnection: (appId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
  startNewChat,
  recentChats,
  onLogout,
  onDeleteChat,
  documents,
  setDocuments,
  onDeleteDocument,
  setActiveSettingModal,
  loadChat,
}) => {
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [docToDelete, setDocToDelete] = useState<string | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isFilesListOpen, setIsFilesListOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [customGoal, setCustomGoal] = useState('');

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      const file = e.target.files[0];
      let type: Document['type'] = 'doc';
      if (file.type.includes('pdf')) type = 'pdf';
      if (file.type.includes('image')) type = 'image';
      
      const newDoc = await saveDocument(file, type);
      setDocuments(prev => [newDoc, ...prev]);
      setIsUploading(false);
      setIsFilesListOpen(true);
    }
  };

  const handleDownload = (doc: Document) => {
    if (doc.content) {
      const link = document.createElement('a');
      link.href = doc.content;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const navItems = [
    { id: 'history' as Tab, icon: History, label: 'History' },
    { id: 'goals' as Tab, icon: Target, label: 'Goals' },
  ];

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
      />

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmationId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
            >
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Delete Log?</h3>
              <p className="text-sm text-neutral-500 mb-6">This conversation will be permanently deleted.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteConfirmationId(null)} 
                  className="flex-1 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-xl hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onDeleteChat(deleteConfirmationId);
                    setDeleteConfirmationId(null);
                  }} 
                  className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
            >
              <div className="w-12 h-12 bg-neutral-100 text-neutral-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut size={24} />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Signing Out?</h3>
              <p className="text-sm text-neutral-500 mb-6">Your clean days data is saved. Come back when you&apos;re serious.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowLogoutConfirm(false)} 
                  className="flex-1 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-xl hover:bg-neutral-200 transition-colors"
                >
                  Stay
                </button>
                <button 
                  onClick={onLogout} 
                  className="flex-1 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete File Confirmation Modal */}
      <AnimatePresence>
        {docToDelete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center"
            >
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={24} />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Delete File?</h3>
              <p className="text-sm text-neutral-500 mb-6">This will permanently delete this document.</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDocToDelete(null)} 
                  className="flex-1 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-xl hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onDeleteDocument(docToDelete);
                    setDocToDelete(null);
                  }} 
                  className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.div 
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`absolute top-0 left-0 h-full w-[300px] bg-white border-r border-neutral-200 z-50 flex flex-col md:translate-x-0 md:static md:h-full shadow-xl md:shadow-none overflow-hidden`}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex justify-between items-center mb-6">
            <motion.div 
              className="cursor-pointer flex items-center gap-2" 
              onClick={startNewChat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <QuiteeLogo size={28} />
              <span className="text-lg font-bold text-neutral-900">Quitee</span>
            </motion.div>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="md:hidden p-2 text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Clean Days Banner */}
          <div className="bg-neutral-900 text-white p-3 rounded-xl mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-emerald-400" />
              <div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Days Clean</p>
                <p className="text-lg font-bold">0 days</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider">Best</p>
              <p className="text-sm font-medium text-neutral-300">0 days</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                      activeTab === item.id 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon size={16} strokeWidth={2} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
            
            <motion.button
              onClick={() => setActiveTab('settings')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold transition-all ${
                activeTab === 'settings' ? 'ring-2 ring-offset-2 ring-emerald-500' : ''
              }`}
            >
              Q
            </motion.button>
          </div>
          
          <div className="h-px bg-neutral-200 w-full"></div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-y-auto px-4 pb-8 safe-bottom">

          {/* GOALS TAB */}
          {activeTab === 'goals' && (
            <div className="flex-1 flex flex-col pt-4 pb-32">
              
              {/* No Goal Set Yet */}
              {!selectedGoal ? (
                <>
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-xs font-medium text-amber-800">Set a goal to track your progress.</p>
                    <p className="text-[10px] text-amber-700 mt-1">Pick one below or create your own.</p>
                  </div>

                  {/* Quick Goals */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-neutral-500 font-medium">Quick pick:</p>
                    
                    {[
                      { days: 7, label: '1 Week', desc: 'Good starting point' },
                      { days: 30, label: '30 Days', desc: 'Build a real habit' },
                      { days: 90, label: '90 Days', desc: 'Life changing' },
                    ].map((goal) => (
                      <motion.button
                        key={goal.days}
                        onClick={() => setSelectedGoal(goal.days)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full p-3 bg-white border-2 border-neutral-200 hover:border-emerald-500 rounded-xl text-left transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-black">{goal.label}</p>
                            <p className="text-[10px] text-neutral-500">{goal.desc}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Target size={16} />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Custom Goal */}
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <p className="text-xs font-medium text-black mb-2">Custom goal:</p>
                    <div className="flex flex-col gap-2">
                      <input
                        type="number"
                        value={customGoal}
                        onChange={(e) => setCustomGoal(e.target.value)}
                        placeholder="Enter number of days"
                        className="w-full p-2.5 bg-white border border-neutral-200 rounded-lg text-sm text-center font-bold focus:outline-none focus:border-emerald-500"
                      />
                      <motion.button
                        onClick={() => {
                          if (customGoal && parseInt(customGoal) > 0) {
                            setSelectedGoal(parseInt(customGoal));
                            setCustomGoal('');
                          }
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!customGoal || parseInt(customGoal) <= 0}
                        className="w-full py-2.5 bg-emerald-500 text-white text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        SET GOAL
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                /* Goal Set - Show Confirmation */
                <>
                  {/* Success Banner */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-4 p-4 bg-emerald-500 text-white rounded-xl text-center"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold">Goal Set!</p>
                    <p className="text-2xl font-bold mt-1">{selectedGoal} Days Clean</p>
                  </motion.div>

                  {/* What Happens Next */}
                  <div className="mb-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <p className="text-xs font-bold text-black mb-2">What happens next:</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                        <p className="text-[11px] text-neutral-600">Chat with me daily to check in</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                        <p className="text-[11px] text-neutral-600">I count your clean days automatically</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                        <p className="text-[11px] text-neutral-600">Hit your goal and celebrate!</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="bg-white border-2 border-emerald-200 p-4 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-black">Your Progress</p>
                      <span className="text-sm font-bold text-emerald-600">0 / {selectedGoal} days</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-4">
                      <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-2 text-center">Start checking in to build your count!</p>
                  </div>

                  {/* Change Goal */}
                  <motion.button
                    onClick={() => setSelectedGoal(null)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-2 text-xs text-neutral-500 hover:text-red-500 transition-colors"
                  >
                    Change my goal
                  </motion.button>
                </>
              )}
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="flex-1 flex flex-col overflow-hidden pt-2">
              <motion.button 
                onClick={startNewChat} 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <Plus size={16} strokeWidth={2.5} />
                <span className="text-sm">New Check-in</span>
              </motion.button>

              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search history..." 
                  value={chatSearchQuery} 
                  onChange={(e) => setChatSearchQuery(e.target.value)} 
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-emerald-300 transition-colors" 
                />
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-1">
                {recentChats.filter(chat => chat.title.toLowerCase().includes(chatSearchQuery.toLowerCase())).map((chat) => (
                  <motion.div 
                    key={chat.id} 
                    onClick={() => loadChat?.(chat.id)} 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative w-full text-left px-3 py-3 rounded-xl text-sm hover:bg-neutral-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-black truncate pr-8">{chat.title}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setDeleteConfirmationId(chat.id); }} 
                        className="absolute right-2 top-2 p-1 text-neutral-400 hover:text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">{chat.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="flex-1 flex flex-col overflow-hidden pt-2">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">Settings</span>
              
              <div className="flex-1 overflow-y-auto space-y-1">
                <motion.button 
                  onClick={() => setActiveSettingModal('account')} 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Account</p>
                    <p className="text-xs text-neutral-400">Name and email</p>
                  </div>
                </motion.button>
                
                <motion.button 
                  onClick={() => setActiveSettingModal('billing')} 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Billing & Plan</p>
                    <p className="text-xs text-neutral-400">Manage subscription</p>
                  </div>
                </motion.button>

                <motion.button 
                  onClick={() => setActiveSettingModal('privacy')} 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Privacy & Security</p>
                    <p className="text-xs text-neutral-400">Password, data controls</p>
                  </div>
                </motion.button>

                <motion.button 
                  onClick={() => setActiveSettingModal('messaging')} 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Messaging Apps</p>
                    <p className="text-xs text-neutral-400">Telegram, WhatsApp</p>
                  </div>
                </motion.button>

                <motion.button 
                  onClick={() => setActiveSettingModal('support')} 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center">
                    <LifeBuoy size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Help & Support</p>
                    <p className="text-xs text-neutral-400">Guides, FAQs, contact</p>
                  </div>
                </motion.button>
              </div>

              <div className="pt-3 border-t border-neutral-200 mt-3">
                <motion.button 
                  onClick={() => setShowLogoutConfirm(true)} 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-400 group-hover:bg-red-100 group-hover:text-red-500 flex items-center justify-center transition-colors">
                    <LogOut size={16} />
                  </div>
                  <span className="text-sm font-medium text-neutral-500 group-hover:text-red-600 transition-colors">Sign Out</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
