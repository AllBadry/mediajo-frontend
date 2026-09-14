import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Database, Share2, Radar, ShieldCheck, Mail, ScrollText } from 'lucide-react';

export default function PrivacyPolicy() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const sections = [
    {
      icon: Database,
      color: 'bg-blue-50 text-blue-600',
      title: isRTL ? 'نطاق السياسية' : 'Scope of This Policy',
      body: isRTL
        ? 'تنطبق سياسة الخصوصية هذه على صفحة MediaJo ولوحة تحكم العميل وجميع الخدمات المقدمة عبر الموقع. توضح السياسة البيانات التي نجمعها ونستخدمها، وكيف يتم التعامل معها بأمان تام.'
        : 'This Privacy Policy applies to the MediaJo website, the customer dashboard, and all services provided through the site. It explains what data we collect and use, and how it is handled securely.',
    },
    {
      icon: Lock,
      color: 'bg-indigo-50 text-indigo-600',
      title: isRTL ? 'البيانات التي نجمعها' : 'Data We Collect',
      body: isRTL
        ? 'نجمع فقط البيانات اللازمة لتقديم خدماتنا وتشغيل الموقع كما هو متوقع، ومن ذلك:'
        : 'We only collect the data necessary to provide our services and operate the website as expected, including:',
      bullets: isRTL
        ? [
            'بيانات الحساب: الاسم والبريد الإلكتروني وكلمة المرور المشفرة',
            'بيانات الطلبات: الخدمات المطلوبة، الأرقام، الحالة، والمدفوعات',
            'بيانات التواصل: الرسائل والتذاكر المرسلة إلى فريق الدعم',
            'بيانات تقنية أساسية: مثل عنوان IP وجلسة المصادقة لأغراض الأمان',
          ]
        : [
            'Account data: your name, email, and encrypted password',
            'Order data: requested services, numbers, status, and payments',
            'Communication data: messages and tickets sent to our support team',
            'Basic technical data: such as IP address and authentication session for security',
          ],
    },
    {
      icon: Share2,
      color: 'bg-emerald-50 text-emerald-600',
      title: isRTL ? 'عدم مشاركة بياناتك' : 'We Do Not Share Your Data',
      body: isRTL
        ? 'نحن لا نبيع ولا نؤجر ولا نشارك بياناتك الشخصية مع أي طرف ثالث لأغراض تسويقية أو إعلانية. بياناتك لا تُستخدم إلا لتشغيل الخدمة التي طلبتها، ولا يُطلع عليها غير فريق العمل المصرح به عند الحاجة لتشغيلها.'
        : 'We do not sell, rent, or share your personal data with any third party for marketing or advertising purposes. Your data is used only to operate the service you requested, and is only accessible by authorized staff when necessary to run it.',
    },
    {
      icon: Radar,
      color: 'bg-amber-50 text-amber-600',
      title: isRTL ? 'التتبع الضروري فقط' : 'Tracking Only What Is Necessary',
      body: isRTL
        ? 'نقتصر في تتبع النشاط على الأمور اللازمة لعمل الموقع فقط، مثل: إرسال الطلب واستقباله، تحديث حالة التنفيذ، معالجة الدفع والاسترداد، وتقديم الدعم. لا نتتبع نشاطك خارج الموقع ولا نرصد عاداتك التصفحية، ولا نجمع بيانات لأغراض لا علاقة لها بتقديم الخدمة.'
        : 'We limit activity tracking to what is necessary for the site to function, such as: sending and receiving an order, updating execution status, processing payment and refunds, and providing support. We do not track your activity outside the site, do not monitor your browsing habits, and do not collect data unrelated to service delivery.',
    },
    {
      icon: ShieldCheck,
      color: 'bg-purple-50 text-purple-600',
      title: isRTL ? 'حماية بياناتك' : 'How We Protect Your Data',
      body: isRTL
        ? 'نحمي بياناتك بتشفير كلمات المرور، واستخدام اتصالات آمنة (HTTPS)، وتقييد الوصول للبيانات على الموظفين المصرح لهم فقط. لا يتاح لأي جهة خارجية الوصول إلى قاعدة بيانات الموقع أو سجلات العملاء.'
        : 'We protect your data by encrypting passwords, using secure connections (HTTPS), and restricting data access to authorized staff only. No external party is granted access to the site database or customer records.',
    },
    {
      icon: ScrollText,
      color: 'bg-sky-50 text-sky-600',
      title: isRTL ? 'تعديل السياسة والتواصل' : 'Policy Updates & Contact',
      body: isRTL
        ? 'قد تُحدَّث هذه السياسة من وقت لآخر، وتُعد النسخة المنشورة على الموقع هي المعتمدة. لأي سؤال حول خصوصية بياناتك تواصل معنا عبر البريد:'
        : 'This policy may be updated from time to time; the version published on the site is the governing one. For any question about the privacy of your data, contact us at:',
    },
  ];

  return (
    <section dir={t.dir} className="page-enter relative w-full min-h-screen bg-[#fafbfc] font-sans overflow-hidden pt-28 lg:pt-36 pb-24 px-6 lg:px-12">
      
      {/* شبكة النقاط */}
      <div className="absolute inset-0 z-0 opacity-25" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* التوهج الخلفي */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-gradient-to-r from-blue-100 via-purple-100 to-green-50 blur-[90px] rounded-full -z-10 opacity-70"></div>

      <div className="max-w-[85rem] w-full mx-auto relative z-10">

        {/* الترويسة */}
        <div className="mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 shadow-sm">
            <Lock className="w-4 h-4 text-emerald-600" />
            {isRTL ? 'خصوصيتك أولاً' : 'Your Privacy First'}
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.95] font-medium tracking-tighter text-[#1e2022]">
            {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[2px] w-16 bg-blue-500"></div>
            <span className="text-lg text-gray-400 font-light">
              {isRTL ? 'بياناتك محمية ولا تُشارك.' : 'Your data stays protected and private.'}
            </span>
          </div>
        </div>

        {/* البطاقات */}
        <div className="flex flex-col gap-6">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-transparent transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center shadow-sm shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-xl md:text-2xl font-black tracking-tight text-gray-900">{s.title}</h2>
                      <span className="text-sm font-mono text-gray-300 font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed text-[15px] md:text-base">{s.body}</p>

                    {s.bullets && (
                      <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {s.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2.5 text-gray-700 font-medium text-sm bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.title === (isRTL ? 'تعديل السياسة والتواصل' : 'Policy Updates & Contact') && (
                      <a
                        href="mailto:support@mediajo.org"
                        className="mt-5 inline-flex items-center gap-2 px-5 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-bold text-sm hover:bg-emerald-100 transition-colors"
                      >
                        <Mail className="w-4 h-4" /> support@mediajo.org
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}