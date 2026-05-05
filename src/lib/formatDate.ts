// utils/formatTime.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

// تفعيل الإضافات المطلوبة
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// تخصيص التنسيق ليظهر بشكل مختصر
dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: '1m',       // ثواني -> دقيقة
    m: "1m",       // دقيقة
    mm: "%dm",     // عدد الدقائق
    h: "1h",       // ساعة
    hh: "%dh",     // عدد الساعات
    d: "1d",       // يوم
    dd: "%dd",     // عدد الأيام
    M: "1mo",      // شهر
    MM: "%dmo",    // عدد الشهور
    y: "1y",       // سنة
    yy: "%dy"      // عدد السنين
  }
});

export const formatRelativeTime = (date:any) => {
  return dayjs(date).fromNow(true); // true بيلغي كلمة ago
};

export default dayjs;