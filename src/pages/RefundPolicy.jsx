import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Coins, RefreshCw, UserCog, LifeBuoy, TrendingDown, Mail, ScrollText } from 'lucide-react';

export default function RefundPolicy() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const sections = [
    {
      icon: Coins,
      color: 'bg-indigo-50 text-indigo-600',
      title: isRTL ? 'الاسترداد بعملة المتجر' : 'Refunds Are Credited in Store Currency',
      body: isRTL
        ? 'تُعاد جميع المبالغ المستردة بعملة المتجر MJ إلى محفظة العميل داخل حسابه، وليس نقداً أو حوالة. سعر الصرف المعتمد: 1 دينار = 10 MJ. يُمكن للعميل استخدام رصيد MJ مباشرة في أي طلب لاحق من داخل الموقع.'
        : 'All refunds are credited back to the customer\'s in-account wallet in the store currency MJ, not as cash or a bank transfer. The approved exchange rate is 1 JOD = 10 MJ. The customer can use the MJ balance directly for any future order on the site.',
    },
    {
      icon: RefreshCw,
      color: 'bg-emerald-50 text-emerald-600',
      title: isRTL ? 'الريفول أولاً — ثم الاسترداد' : 'Refill First — Refund Second',
      body: isRTL
        ? 'لا يُقبل أي طلب استرداد لخدمة إلا بعد محاولة إعادة التعبئة (Refill) للخدمة المتأثرة إذا كانت الإعادة متاحة، لأن الريفول يصلح معظم الحالات المتعلقة بانخفاض الأرقام. يُعدّ الاسترداد الحل الأخير بعد فشل محاولة الريفول أو تعذرها.'
        : 'No refund request for a service will be accepted before attempting to refill the affected service whenever a refill is available, because a refill resolves most cases related to dropped numbers. A refund is the last resort after a refill attempt fails or is not possible.',
    },
    {
      icon: UserCog,
      color: 'bg-sky-50 text-sky-600',
      title: isRTL ? 'اطلب الريفول بنفسك' : 'Request a Refill Yourself',
      body: isRTL
        ? 'العميل قادر على إعادة تعبئة الخدمة ذاتياً من لوحة التحكم الخاصة به دون الحاجة للتواصل مع أحد، فيعاد تنفيذ الطلب واستكمال الأرقام المطلوبة بشكل مباشر.'
        : 'The customer can refill the service themselves from their dashboard with no need to contact anyone; the order will be re-executed and the required numbers completed directly.',
    },
    {
      icon: LifeBuoy,
      color: 'bg-amber-50 text-amber-600',
      title: isRTL ? 'حالات خاصة عبر الدعم' : 'Special Cases Via Support',
      body: isRTL
        ? 'في الحالات التي يتعذر فيها الريفول الذاتي أو لا يعالج المشكلة، يمكن للعميل التواصل مع فريق الدعم لمعالجة الحالة أو الموافقة على استثناء معين (مثل الاسترداد كلياً أو جزئياً بعملة MJ).'
        : 'In cases where a self-service refill is not possible or does not resolve the issue, the customer can contact the support team to handle the case or approve a specific exception (such as a full or partial refund in MJ).',
    },
    {
      icon: TrendingDown,
      color: 'bg-rose-50 text-rose-600',
      title: isRTL ? 'متى يُستخدم الريفول — ومتى الاسترداد' : 'When Refill Applies vs. Refund',
      body: isRTL
        ? 'الريفول مخصص للخدمة التي بدأت بالعمل ثم حدث عارض أدى إلى انخفاض الأرقام (مثل عطل من المزود)، فيُعاد تعبئة الخدمة لاستكمال الكمية. أما الخدمة التي لم تصل أصلاً — أي لم يبدأ تنفيذها أو لم يُقدَّم منها شيء — فليست حالة ريفول، بل تُعالج مباشرة كحالة استرداد وفق هذه السياسة.'
        : 'A refill applies to a service that started working, then an incident (such as a provider failure) caused the numbers to drop, so the service is refilled to complete the required quantity. A service that never arrived at all — meaning it never started or nothing was delivered — is not a refill case; it is handled directly as a refund case under this policy.',
    },
    {
      icon: ScrollText,
      color: 'bg-purple-50 text-purple-600',
      title: isRTL ? 'تواصل معنا' : 'Contact Us',
      body: isRTL
        ? 'لأي استفسار حول سياسة الاسترداد أو حالة طلب معين، تواصل مع فريق الدعم عبر البريد:'
        : 'For any question regarding the refund policy or a specific order status, contact the support team at:',
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
            <Coins className="w-4 h-4 text-indigo-600" />
            {isRTL ? 'عملة المتجر MJ' : 'Store Currency MJ'}
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.95] font-medium tracking-tighter text-[#1e2022]">
            {isRTL ? 'سياسة الاسترداد' : 'Refund Policy'}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[2px] w-16 bg-blue-500"></div>
            <span className="text-lg text-gray-400 font-light">
              {isRTL ? 'الريفول أولاً، والاسترداد بعملة المتجر.' : 'Refill first; refunds in store currency.'}
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* شارة التواصل */}
        <div className="mt-8 bg-white rounded-[2rem] border border-gray-200 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-gray-900">{isRTL ? 'فريق الدعم' : 'Support Team'}</p>
              <p className="text-sm text-gray-500 font-medium">{isRTL ? 'متاح على مدار الساعة للرد على استفساراتك' : 'Available around the clock to answer your questions'}</p>
            </div>
          </div>
          <a
            href="mailto:support@mediajo.org"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1e2022] text-white rounded-2xl font-bold text-sm hover:bg-black transition-colors"
          >
            support@mediajo.org <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}