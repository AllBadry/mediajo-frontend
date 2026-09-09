// ============================================================
// أداة الصوت المشتركة
// المتصفحات تمنع تشغيل الصوت قبل أول تفاعل من المستخدم (Autoplay Policy)
// — الحل: نحفظ الصوت المطلوب، وعند أول نقرة/لمسة قادمة نعيد المحاولة فوراً.
// ============================================================

const cache = {};
let pending = null;
let registered = false;

function attempt(a) {
  if (!a) return;
  try {
    a.currentTime = 0;
    const p = a.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        pending = a;
      });
    }
  } catch {
    pending = a;
  }
}

function flushPending() {
  if (!pending) return;
  const a = pending;
  pending = null;
  attempt(a);
}

// يُستدعى مرة واحدة عند تشغيل التطبيق
export function initSounds() {
  if (registered) return;
  registered = true;
  ['pointerdown', 'keydown', 'touchstart', 'click'].forEach((evt) => {
    window.addEventListener(evt, flushPending);
  });
}

// تشغيل ملف صوتي (يُخزّن مؤقتاً لإعادة تشغيل فورية)
export function playSound(src) {
  let a = cache[src];
  if (!a) {
    a = new Audio(src);
    a.preload = 'auto';
    cache[src] = a;
  }
  attempt(a);
}