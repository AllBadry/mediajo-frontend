import React, { useRef, useState } from 'react';
import { MessageSquare, Plus, AlertCircle, CheckCircle2, Clock, Send, X, HelpCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function SupportTickets() {
  const container = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // بيانات وهمية للتذاكر
  const [tickets, setTickets] = useState([
    { 
      id: "TICK-441", 
      subject: "Issue with Netflix Account Login", 
      status: "Answered", 
      date: "Today, 14:20", 
      category: "Streaming",
      messages: [
        { sender: "user", text: "Hello, the password for the Netflix account I bought isn't working.", time: "14:00" },
        { sender: "support", text: "Dear customer, we apologize for this. Please try the updated password sent to your email or let us know.", time: "14:20" }
      ]
    },
    { 
      id: "TICK-390", 
      subject: "Inquiry about Instagram followers delivery", 
      status: "Closed", 
      date: "Oct 20, 2026", 
      category: "Social Media",
      messages: [
        { sender: "user", text: "When will my order start processing?", time: "10:00" },
        { sender: "support", text: "Orders start automatically within 1 to 2 hours.", time: "10:30" }
      ]
    },
  ]);

  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useGSAP(() => {
    gsap.fromTo(".ticket-card", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: container });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newSubject || !newMessage) return;

    const newTicket = {
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      subject: newSubject,
      status: "Open",
      date: "Just now",
      category: "General",
      messages: [
        { sender: "user", text: newMessage, time: "Just now" }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setNewSubject('');
    setNewMessage('');
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Answered': return { icon: <AlertCircle className="w-4 h-4"/>, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' };
      case 'Open': return { icon: <Clock className="w-4 h-4"/>, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' };
      case 'Closed': return { icon: <CheckCircle2 className="w-4 h-4"/>, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' };
      default: return { icon: <HelpCircle className="w-4 h-4"/>, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100' };
    }
  };

  return (
    <div ref={container} className="w-full flex flex-col gap-6 relative">
      
      {/* Header & New Ticket Button */}
      <div className="bg-white border border-gray-200 rounded-[2rem] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            Support Tickets
          </h2>
          <p className="text-gray-500 font-medium mt-1">Get fast assistance from our 24/7 technical team.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Open New Ticket
        </button>
      </div>

      {/* Tickets List / Chat Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tickets List (Left Column) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Your Tickets</h3>
          
          {tickets.map((ticket) => {
            const config = getStatusBadge(ticket.status);
            const isSelected = selectedTicket?.id === ticket.id;

            return (
              <div 
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`ticket-card bg-white border rounded-[1.5rem] p-5 cursor-pointer transition-all duration-300 ${
                  isSelected ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-gray-400">{ticket.id}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full flex items-center gap-1 ${config.bg} ${config.color}`}>
                    {config.icon} {ticket.status}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-base mb-2 line-clamp-1">{ticket.subject}</h4>
                <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span>{ticket.category}</span>
                  <span>{ticket.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat / Ticket Details (Right Columns) */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="bg-white border border-gray-200 rounded-[2rem] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col h-[600px]">
              
              {/* Ticket Header */}
              <div className="border-b border-gray-100 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-600">{selectedTicket.id}</span>
                  <h3 className="text-xl font-black text-gray-900 mt-1">{selectedTicket.subject}</h3>
                </div>
                <span className="text-xs text-gray-400 font-medium">{selectedTicket.date}</span>
              </div>

              {/* Messages Flow */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6">
                {selectedTicket.messages.map((msg, index) => (
                  <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <input 
                  type="text" 
                  placeholder="Type your reply..." 
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                />
                <button className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl flex items-center justify-center shrink-0 transition-colors shadow-sm">
                  <Send className="w-5 h-5 rtl:rotate-180" />
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center h-[600px]">
              <MessageSquare className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-black text-gray-900 mb-2">Select a ticket</h3>
              <p className="text-gray-500 font-medium max-w-sm">Choose a support ticket from the left list to view the conversation details.</p>
            </div>
          )}
        </div>

      </div>

      {/* Modal: فتح تذكرة جديدة */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-gray-900 mb-2">Open New Ticket</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">Describe your issue and our team will respond shortly.</p>

            <form onSubmit={handleCreateTicket} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g., Payment verification issue" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea 
                  rows="4" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Provide as much detail as possible..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-[0_10px_25px_rgba(37,99,235,0.25)] mt-2">
                Submit Ticket
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}