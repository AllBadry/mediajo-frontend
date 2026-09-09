import { useEffect, useRef } from 'react';
import api from '../../api/client';
import { playSound } from '../../utils/sound';

// مراقب التذاكر: يشغّل صوتاً مميزاً عند وصول رد جديد من الدعم
export default function TicketSoundWatcher() {
  const signature = useRef(null);

  useEffect(() => {
    const checkTickets = async () => {
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
      } catch {
        /* تجاهل أخطاء الجلب (انقطاع الاتصال مثلاً) */
      }
    };

    checkTickets();
    const interval = setInterval(checkTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  return null;
}