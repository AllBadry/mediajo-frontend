import React, { useRef, useState, useEffect } from 'react';
import { MessageSquare, Plus, AlertCircle, CheckCircle2, Clock, Send, X, HelpCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../lib/axios';
import { useTicketStore } from '../../store/ticketStore';

export default function SupportTickets() {
  const container = useRef();
  const { t } = useLanguage();
  
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // حالات التحميل والواجهة
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // مدخلات التذكرة الجديدة
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newCategory, setNewCategory] = useState('OTHER');
  
  // مدخل الرد
  const [replyText, setReplyText] = useState('');

  const markAllSeen = useTicketStore((s) => s.markAllSeen);
  const markTicketSeen = useTicketStore((s) => s.markTicketSeen);

  // 1. جلب قائمة تذاكر العميل عند التحميل
  useEffect(() => {
    fetchMyTickets();
    // عند فتح الصفحة تعتبر التذاكر مشاهَدة وتُصفَّر الشارة
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMyTickets = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/tickets/my-tickets');
      const tickets = res.data.data.tickets;
      setTickets(tickets);
      markAllSeen(tickets);
    } catch (error) {
      console.error('فشل في جلب التذاكر:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. جلب تفاصيل التذكرة (مع الرسائل) عند النقر عليها
  const handleSelectTicket = async (ticketId) => {
    try {
      setIsFetchingDetails(true);
      const res = await api.get(`/tickets/${ticketId}`);
      setSelectedTicket(res.data.data.ticket);
      markTicketSeen(ticketId, tickets);
    } catch (error) {
      console.error('فشل في جلب تفاصيل التذكرة:', error);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  // 3. إنشاء تذكرة جديدة
  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessage.trim()) return;

    try {
      setIsSending(true);
      await api.post('/tickets', {
        subject: newSubject,
        category: newCategory,
        message: newMessage
      });
      
      // تصفير الحقول وإغلاق النافذة وتحديث القائمة
      setNewSubject('');
      setNewMessage('');
      setIsModalOpen(false);
      fetchMyTickets();
    } catch (error) {
      console.error('فشل في إنشاء التذكرة:', error);
      alert('حدث خطأ أثناء فتح التذكرة.');
    } finally {
      setIsSending(false);
    }
  };

  // 4. إرسال رد على التذكرة المفتوحة
  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    try {
      setIsSending(true);
      const res = await api.post(`/tickets/${selectedTicket._id}/reply`, {
        message: replyText
      });
      
      // تحديث التذكرة الحالية بالبيانات الجديدة القادمة من الخادم
      setSelectedTicket(res.data.data.ticket);
      setReplyText('');
      
      // تحديث القائمة الجانبية لتعكس الحالة الجديدة ووقت التحديث
      fetchMyTickets();
    } catch (error) {
      console.error('فشل في إرسال الرد:', error);
      alert(error.response?.data?.message || 'فشل إرسال الرد');
    } finally {
      setIsSending(false);
    }
  };

  useGSAP(() => {
    if (!isLoading) {
      gsap.fromTo(".ticket-card", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, { scope: container, dependencies: [isLoading] });

  // تنسيق حالة التذكرة
  const getStatusBadge = (status) => {
    const label = t.dashboard?.ticketStatus?.[status.toLowerCase()] || status;
    switch(status) {
      case 'CUSTOMER_REPLY':
      case 'OPEN': return { icon: <Clock className="w-4 h-4"/>, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', label: 'مفتوحة' };
      case 'ANSWERED': return { icon: <AlertCircle className="w-4 h-4"/>, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', label: 'تم الرد' };
      case 'CLOSED': return { icon: <CheckCircle2 className="w-4 h-4"/>, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'مغلقة' };
      default: return { icon: <HelpCircle className="w-4 h-4"/>, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100', label };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(t.dir === 'rtl' ? 'ar-JO' : 'en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div ref={container} className="w-full flex flex-col gap-6 relative">
      
      {/* Header & New Ticket Button */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> {t.dashboard?.supportTickets || 'تذاكر الدعم الفني'}
        </span>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-lg font-bold text-sm transition-all shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> {t.dashboard?.openNewTicket || 'فتح تذكرة جديدة'}
        </button>
      </div>

      {/* Tickets List / Chat Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tickets List (Left Column) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">{t.dashboard?.yourTickets || 'تذاكرك'}</h3>
          
          {isLoading ? (
            <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
          ) : tickets.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-500 text-sm font-medium">
              لا توجد تذاكر مفتوحة حالياً.
            </div>
          ) : (
            tickets.map((ticket) => {
              const config = getStatusBadge(ticket.status);
              const isSelected = selectedTicket?._id === ticket._id;

              return (
                <div 
                  key={ticket._id}
                  onClick={() => handleSelectTicket(ticket._id)}
                  className={`ticket-card bg-white border rounded-lg p-5 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-gray-400">
                      {ticket._id.substring(ticket._id.length - 6).toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1 ${config.bg} ${config.color}`}>
                      {config.icon} {config.label}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base mb-2 line-clamp-1">{ticket.subject}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                    <span>{ticket.category}</span>
                    <span>{formatDate(ticket.updatedAt)}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chat / Ticket Details (Right Columns) */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col h-[600px]">
              
              {/* Ticket Header */}
              <div className="border-b border-gray-100 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600">ID: {selectedTicket._id}</span>
                  <h3 className="text-xl font-black text-gray-900 mt-1">{selectedTicket.subject}</h3>
                </div>
                <span className="text-xs text-gray-400 font-medium">{formatDate(selectedTicket.createdAt)}</span>
              </div>

              {/* Messages Flow */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6">
                {isFetchingDetails ? (
                  <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
                ) : (
                  selectedTicket.messages?.map((msg, index) => {
                    const isSupport = msg.isAdmin;
                    return (
                      <div key={index} className={`flex flex-col ${!isSupport ? 'items-start' : 'items-end'}`}>
                        <span className="text-[10px] font-bold text-gray-400 mb-1 px-1">
                          {!isSupport ? selectedTicket.user?.name : 'الدعم الفني'}
                        </span>
                        <div className={`max-w-[80%] p-4 rounded-lg text-sm font-medium leading-relaxed ${
                          !isSupport 
                            ? 'bg-blue-600 text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}>
                          {msg.message}
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 px-1">{formatDate(msg.createdAt)}</span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Reply Input */}
              {selectedTicket.status !== 'CLOSED' ? (
                <form onSubmit={handleReply} className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <input 
                    type="text" 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={t.dashboard?.typeReply || 'اكتب ردك هنا...'} 
                    dir={t.dir}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <button 
                    type="submit" 
                    disabled={isSending || !replyText.trim()}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-sm"
                  >
                    {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 rtl:rotate-180" />}
                  </button>
                </form>
              ) : (
                <div className="pt-4 border-t border-gray-100 text-center text-sm font-bold text-red-500">
                  هذه التذكرة مغلقة. لا يمكنك إضافة ردود جديدة.
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center h-[600px]">
              <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">{t.dashboard?.selectTicket || 'اختر تذكرة لعرض التفاصيل'}</h3>
              <p className="text-gray-500 font-medium max-w-sm">{t.dashboard?.selectTicketSub || 'قم باختيار تذكرة من القائمة الجانبية لمتابعة المحادثة مع الدعم الفني.'}</p>
            </div>
          )}
        </div>

      </div>

      {/* Modal: فتح تذكرة جديدة */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-gray-900 mb-2">{t.dashboard?.openNewTicket || 'فتح تذكرة جديدة'}</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">{t.dashboard?.describeIssue || 'يرجى وصف المشكلة بوضوح لنتمكن من مساعدتك.'}</p>

            <form onSubmit={handleCreateTicket} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.dashboard?.subject || 'الموضوع'}</label>
                <input 
                  type="text" 
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="مثال: مشكلة في طلب رقم..." 
                  dir={t.dir}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">القسم</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                >
                  <option value="ORDER">مشكلة في طلب</option>
                  <option value="PAYMENT">مشكلة مالية / دفع</option>
                  <option value="SERVICE_ISSUE">استفسار عن خدمة</option>
                  <option value="OTHER">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t.dashboard?.message || 'الرسالة'}</label>
                <textarea 
                  rows="4" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="اكتب تفاصيل مشكلتك هنا..." 
                  dir={t.dir}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-4 rounded-lg font-bold text-sm transition-all shadow-[0_10px_25px_rgba(37,99,235,0.25)] mt-2 flex justify-center items-center gap-2"
              >
                {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {t.dashboard?.submitTicket || 'إرسال التذكرة'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}