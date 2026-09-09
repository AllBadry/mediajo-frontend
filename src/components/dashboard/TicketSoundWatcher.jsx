import { useEffect, useRef, useCallback } from 'react';
import api from '../../api/client';
import { playSound } from '../../utils/sound';
import { useTicketStore, computeUnseen } from '../../store/ticketStore';

// مراقب التذاكر: يشغّل صوتاً مميزاً عند نشاط جديد
// ويحدّث عدّاد "غير المقروء" في السايد بار
export default function TicketSoundWatcher() {
  const signature = useRef(null);
  const setUnseen = useTicketStore((s) => s.setUnseen);

  const checkTickets = useCallback(async () => {
    try {
      const { data } = await api.get('/tickets/my-tickets');
      const tickets = data?.data?.tickets || [];

      // بصمة القائمة: أي تغيير في تذكرة (رد جديد/حالة) يعني نشاطاً جديداً
      const sig = tickets
        .map((t) => `${t._id}:${t.status}:${t.updatedAt}`)
        .join('|');

      if (signature.current !== null && sig !== signature.current) {
        if (!document.hidden) playSound('/ticket.wav');
      }
      signature.current = sig;

      // تحديث شارة السايد بار (التحديثات التي لم يرها العميل)
      setUnseen(computeUnseen(tickets));
    } catch {
      /* تجاهل أخطاء الجلب (انقطاع الاتصال مثلاً) */
    }
  }, [setUnseen]);

  useEffect(() => {
    checkTickets();
    const interval = setInterval(checkTickets, 30000);
    return () => clearInterval(interval);
  }, [checkTickets]);

  return null;
}