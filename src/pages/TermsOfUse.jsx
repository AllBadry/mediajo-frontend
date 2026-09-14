import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ScrollText, Ban, Trophy, ImageOff, ShieldAlert, Mail, CheckCircle2 } from 'lucide-react';

export default function TermsOfUse() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const sections = [
    {
      icon: ScrollText,
      color: 'bg-blue-50 text-blue-600',
      title: isRTL ? 'قبول الشروط' : 'Acceptance of Terms',
      body: isRTL
        ? 'باستخدامك لخدمات MediaJo فإنك توافق على الالتزام الكامل بشروط الاستخدام هذه وبجميع سياساتنا. قد تُحدَّث هذه الشروط من وقت لآخر، وتُعد النسخة المنشورة على هذا الموقع هي النسخة المعتمدة والسارية.'
        : 'By using MediaJo services, you agree to fully comply with these Terms of Use and all of our policies. These terms may be updated from time to time; the version published on this website is the governing and binding one.',
    },
    {
      icon: Ban,
      color: 'bg-red-50 text-red-600',
      title: isRTL ? 'المحتوى المحظور شرعاً' : 'Religiously Prohibited Content',
      body: isRTL
        ? 'نحن خدمة نمو رقمي ملتزمة بالضوابط الشرعية والقانونية، ولا نسمح نهائياً بشراء الدعم (متابعين، إعجابات، مشاهدات، أو أي شكل من أشكال النمو) لأي موقع، صفحة، حساب، أو خدمة تُقدِّم أو تروّج لمحتوى محرم شرعاً، ومن ذلك على سبيل المثال لا الحصر:'
        : 'We are a digital growth service committed to Sharia-compliant and lawful standards. We absolutely do not allow purchasing support (followers, likes, views, or any form of growth) for any website, page, account, or service that offers or promotes religiously prohibited content, including but not limited to:',
      bullets: isRTL
        ? [
            'الموسيقى والأغاني',
            'صور النساء والمحتوى النسائي غير المناسب',
            'القمار والمراهنات والسحوبات العشوائية',
            'الخمور والمخدرات وما يشابهها',
            'المحتوى الإباحي والفاضح',
            'أي نشاط محرم شرعاً أو مخالف للقانون والأخلاق',
          ]
        : [
            'Music and songs',
            'Women\'s photos and inappropriate female content',
            'Gambling, betting, and random draws',
            'Alcohol, drugs, and anything similar',
            'Pornographic and indecent content',
            'Any activity prohibited by Sharia or violating law and ethics',
          ],
    },
    {
      icon: Trophy,
      color: 'bg-amber-50 text-amber-600',
      title: isRTL ? 'المسابقات والغش' : 'Contests & Cheating',
      body: isRTL
        ? 'لا نسمح بشراء الدعم للمسابقات أو السحوبات التي تعتمد على تحصيل الإعجابات أو الأصوات أو المشاركات لتحقيق الفوز، لأن ذلك يُعد غشاً وتضليلاً للمنظمين والمشاركين. أي طلب يُكتشف أنه موجَّه للتلاعب بنتائج المسابقات أو تزويرها يُلغى فوراً دون أي تعويض أو استرداد.'
        : 'We do not allow purchasing support for contests or giveaways that rely on collecting likes, votes, or entries to win, as this is considered cheating and deception of organizers and participants. Any order found to be aimed at manipulating or falsifying contest results will be cancelled immediately without any compensation or refund.',
    },
    {
      icon: ImageOff,
      color: 'bg-purple-50 text-purple-600',
      title: isRTL ? 'إزالة المحتوى غير المناسب بعد الاستلام' : 'Removal of Inappropriate Content After Delivery',
      body: isRTL
        ? 'يلتزم المشتري، عند وصول أي متابعات أو إعجابات أو مشاهدات أو تفاعلات من حسابات نسائية أو صور نساء إلى صفحته أو لايكاته أو أي محتوى يخصه نتيجة خدمات النمو، بحذفها وإزالتها فوراً من حسابه ومحتواه. لا يجوز للمشتري إبقاء أي صورة نسائية أو حساب نسائي واصل عبر الدعم، وهو المسؤول بالكامل عن المحتوى الظاهر على حسابه بعد استلام الطلب.'
        : 'The buyer is obligated, upon receiving any followers, likes, views, or interactions from female accounts or women\'s photos to their page, likes, or any of their content as a result of our growth services, to delete and remove them immediately from their account and content. The buyer may not keep any women\'s photos or female accounts received through support, and is fully responsible for the content visible on their account after order delivery.',
    },
    {
      icon: ShieldAlert,
      color: 'bg-emerald-50 text-emerald-600',
      title: isRTL ? 'تطبيق الشروط ومخالفتها' : 'Enforcement & Violations',
      body: isRTL
        ? 'نحتفظ بالحق الكامل في إلغاء أو تعليق أي طلب يخالف هذه الشروط دون تعويض أو استرداد، وتعليق أو إغلاق حساب المخالف نهائياً عند تكرار المخالفة. تُراجع طلباتنا من قبل فريق الالتزام للتأكد من مطابقتها لهذه الضوابط قبل التنفيذ.'
        : 'We reserve the full right to cancel or suspend any order that violates these terms without compensation or refund, and to suspend or permanently close the account of a repeat violator. Our orders are reviewed by our compliance team to ensure they comply with these standards before execution.',
    },
    {
      icon: CheckCircle2,
      color: 'bg-sky-50 text-sky-600',
      title: isRTL ? 'إخلاء مسؤولية' : 'Disclaimer',
      body: isRTL
        ? 'لا تتحمل MediaJo أي مسؤولية عن استخدام غير متوافق مع هذه الشروط من قبل المشتري، ولا عن أي عواقب تنشأ عن توجيه خدمات النمو لمحتوى محرم أو مخالف للشروط والسياسات. لأي استفسار حول هذه الشروط تواصل معنا عبر البريد:'
        : 'MediaJo bears no responsibility for any use of the services that does not comply with these terms, nor for any consequences arising from directing growth services toward prohibited or policy-violating content. For any questions regarding these terms, contact us at:',
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
            <ScrollText className="w-4 h-4 text-blue-600" />
            {isRTL ? 'وثيقة قانونية' : 'Legal Notice'}
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.95] font-medium tracking-tighter text-[#1e2022]">
            {isRTL ? 'شروط الاستخدام' : 'Terms of Use'}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[2px] w-16 bg-blue-500"></div>
            <span className="text-lg text-gray-400 font-light">
              {isRTL ? 'قواعد موجِّهة لكل استخدام لخدماتنا.' : 'The rules that govern every use of our services.'}
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
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.title === (isRTL ? 'إخلاء مسؤولية' : 'Disclaimer') && (
                      <a
                        href="mailto:support@mediajo.org"
                        className="mt-5 inline-flex items-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 rounded-2xl font-bold text-sm hover:bg-blue-100 transition-colors"
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