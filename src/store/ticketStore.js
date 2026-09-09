import { create } from 'zustand';

// ============================================================
// حالة التذاكر في لوحة تحكم العميل
// نُخزّن وقت آخر مشاهدة لكل تذكرة (في localStorage) ونعرض
// عدد التحديثات الجديدة التي لم يرها العميل في شارة السايد بار.
// ============================================================

const SEEN_KEY = 'mediajo_ticket_seen';

export const loadSeenMap = () => {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) || '{}');
  } catch {
    return {};
  }
};

export const saveSeenMap = (map) => {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(map));
  } catch {
    /* تجاهل */
  }
};

// عدد التذاكر التي لديها نشاط أحدث من آخر مشاهدة للعميل
export const computeUnseen = (tickets) => {
  const seen = loadSeenMap();
  return (tickets || []).filter((t) => {
    const last = seen[t._id] || 0;
    return new Date(t.updatedAt).getTime() > last;
  }).length;
};

export const useTicketStore = create((set) => ({
  unseen: 0,
  setUnseen: (n) => set({ unseen: typeof n === 'number' && n > 0 ? n : 0 }),
  // تمييز تذكرة واحدة كمشاهَدة (عند فتحها)
  markTicketSeen: (ticketId, tickets) => {
    const seen = loadSeenMap();
    seen[ticketId] = Date.now();
    saveSeenMap(seen);
    set({ unseen: computeUnseen(tickets) });
  },
  // تمييز جميع التذاكر كمشاهَدة (عند فتح صفحة التذاكر)
  markAllSeen: (tickets) => {
    const seen = loadSeenMap();
    (tickets || []).forEach((t) => {
      seen[t._id] = Date.now();
    });
    saveSeenMap(seen);
    set({ unseen: 0 });
  },
}));