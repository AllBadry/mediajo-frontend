import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const inputClass = "w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 focus:bg-white transition-all";

export default function ContactUs() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  return (
    <section dir={t.dir} className="relative w-full min-h-screen bg-[#fafbfc] font-sans overflow-hidden pt-24 pb-20 px-6 lg:px-12">
      
      {/* شبكة النقاط */}
      <div className="absolute inset-0 z-0 opacity-25" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* التوهج الخلفي */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-gradient-to-r from-blue-100 via-purple-100 to-green-50 blur-[90px] rounded-full -z-10 opacity-70"></div>

      <div className="max-w-[85rem] w-full mx-auto relative z-10">

        {/* =========================================
            العنوان العملاق
            ========================================= */}
        <div className="mb-16 lg:mb-20">
          <h1 className="text-5xl sm:text-7xl lg:text-[6rem] leading-[0.9] font-medium tracking-tighter text-[#1e2022]">
            {t.contactPage.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[2px] w-16 bg-blue-500"></div>
            <span className="text-xl text-gray-400 font-light italic lg:text-2xl">{t.contactPage.reachUs}</span>
          </div>
          <p className="mt-6 text-lg text-gray-500 font-light leading-relaxed max-w-2xl">
            {t.contactPage.sub}
          </p>
        </div>

        {/* =========================================
            بطاقات القنوات السريعة
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          <a href="tel:+962798500771" className="group bg-white rounded-[2rem] border border-gray-200 p-7 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:border-transparent transition-all duration-300">
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-1">{t.contactPage.phoneTitle}</h3>
            <p className="text-sm font-medium text-gray-500">+962 798 500 771</p>
          </a>

          <a href="mailto:support@mediajo.org" className="group bg-white rounded-[2rem] border border-gray-200 p-7 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:border-transparent transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-1">{t.contactPage.emailTitle}</h3>
            <p className="text-sm font-medium text-gray-500">support@mediajo.org</p>
          </a>

          <div className="group bg-white rounded-[2rem] border border-gray-200 p-7 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] hover:border-transparent transition-all duration-300">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
              <ShieldCheck className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-1">24/7 {t.contactPage.support}</h3>
            <p className="text-sm font-medium text-gray-500">{t.contactPage.supportSub}</p>
          </div>
        </div>

        {/* =========================================
            القسم الرئيسي: البيانات + النموذج
            ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* العمود الأيسر: معلومات التواصل */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-8">
              
              {/* سطر: الهاتف */}
              <div className="flex flex-col gap-2 border-b border-gray-300 pb-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.contactPage.phoneTitle}</span>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-700" />
                  <span className="text-xl font-medium text-[#1e2022]">+962 798 500 771</span>
                </div>
              </div>

              {/* سطر: الإيميل */}
              <div className="flex flex-col gap-3 border-b border-gray-300 pb-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.contactPage.emailTitle}</span>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-700 shrink-0" />
                  <span className="font-medium text-[#1e2022]">support@mediajo.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5"></span>
                  <span className="font-medium text-[#1e2022]">api@mediajo.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5"></span>
                  <span className="font-medium text-[#1e2022]">billing@mediajo.org</span>
                </div>
              </div>

              {/* سطر: الموقع */}
              <div className="flex flex-col gap-3 pb-8">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.contactPage.infoLocations}</span>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-700 shrink-0" />
                  <div>
                    <span className="font-medium text-[#1e2022]">Amman, Jordan</span>
                    <span className="block text-sm text-gray-500 font-medium">{t.contactPage.infoGlobal}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* شارة وقت الاستجابة */}
            <div className="hidden lg:flex items-center gap-3 px-5 py-4 bg-white rounded-2xl border border-gray-200">
              <Clock className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-bold text-gray-900 text-sm">{t.contactPage.infoResponse}</p>
                <p className="text-xs text-gray-500 font-medium">{t.contactPage.infoResponseSub}</p>
              </div>
            </div>
          </div>

          {/* العمود الأيمن: نموذج التواصل */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
              
              {sent ? (
                /* رسالة النجاح بعد الإرسال */
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{t.contactPage.successTitle}</h3>
                  <p className="text-gray-500 font-medium max-w-sm">
                    {t.contactPage.successBody}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-8 px-6 py-3 bg-[#1e2022] text-white rounded-full font-bold text-sm hover:bg-black transition-colors"
                  >
                    {t.contactPage.sendAnother}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-1">{t.contactPage.sendTitle}</h2>
                  <p className="text-sm text-gray-500 font-medium mb-7">{t.contactPage.sendSub}</p>

                  <form
                    onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">{t.contactPage.name}</label>
                        <input required type="text" placeholder={t.contactPage.namePlaceholder} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">{t.contactPage.email}</label>
                        <input required type="email" placeholder={t.contactPage.emailPlaceholder} className={inputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">{t.contactPage.phoneOptional}</label>
                        <input type="tel" placeholder="+962..." className={inputClass} />
                      </div>
                      <div>
                        <label className="text-sm font-bold text-gray-700 mb-2 block">{t.contactPage.subject}</label>
                        <input type="text" placeholder={t.contactPage.subjectPlaceholder} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400" /> {t.contactPage.message}
                      </label>
                      <textarea
                        required
                        rows="5"
                        placeholder={t.contactPage.messagePlaceholder}
                        className={`${inputClass} resize-none`}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-8 bg-[#1e2022] text-white rounded-2xl font-bold text-sm hover:bg-black hover:-translate-y-0.5 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                    >
                      {t.contactPage.send} <Send className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
