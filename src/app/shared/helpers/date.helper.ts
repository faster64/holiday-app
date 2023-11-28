export class DateHelper {
  public static months = [
    { id: 1, text: "Tháng 1" },
    { id: 2, text: "Tháng 2" },
    { id: 3, text: "Tháng 3" },
    { id: 4, text: "Tháng 4" },
    { id: 5, text: "Tháng 5" },
    { id: 6, text: "Tháng 6" },
    { id: 7, text: "Tháng 7" },
    { id: 8, text: "Tháng 8" },
    { id: 9, text: "Tháng 9" },
    { id: 10, text: "Tháng 10" },
    { id: 11, text: "Tháng 11" },
    { id: 12, text: "Tháng 12" },
  ];

  public static firstOfDay() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(today);
  }

  public static lastOfDay() {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return new Date(today);
  }

  public static firstOfWeek() {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    firstDayOfWeek.setHours(0, 0, 0, 0);
    return new Date(firstDayOfWeek);
  }

  public static lastOfWeek() {
    const today = new Date();
    const lastDayOfWeek = new Date(today);
    lastDayOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    lastDayOfWeek.setHours(23, 59, 59, 999);
    return new Date(lastDayOfWeek);
  }

  public static firstOfMonth() {
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
    return new Date(today);
  }

  public static lastOfMonth() {
    const today = new Date();
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    last.setHours(23, 59, 59, 999);
    return new Date(last);
  }

  public static firstOfYear() {
    const today = new Date();
    today.setMonth(0);
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
    return new Date(today);
  }

  public static firstOfNextYear = new Date(new Date().getFullYear() + 1, 0, 1);

  public static lastOfYear() {
    const today = new Date();
    today.setMonth(11);
    today.setDate(31);
    today.setHours(23, 59, 59, 999);
    return new Date(today);
  }

  public static currentMonth = new Date().getMonth() + 1;

  public static currentYear = new Date().getFullYear();

  public static daysInThisMonth = DateHelper.getDaysInMonth(DateHelper.currentMonth, DateHelper.currentYear);

  public static now = new Date();

  public static todayISO = new Date().toISOString().split('T')[0];

  public static getExactlyDate(date: Date) {
    return new Date(date);
  }

  public static getTimeOnly(date: Date) {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    const hourStr = hour < 10 ? '0' + hour : hour;
    const minuteStr = minute < 10 ? '0' + minute : minute;
    const secondStr = second < 10 ? '0' + second : second;

    return `${hourStr}:${minuteStr}:${secondStr}`;
  }

  public static formatDate(date: Date, containYear?: boolean) {
    if (date == null) {
      return '';
    }

    const clone = new Date(date);
    let day = clone.getDate();
    let month = clone.getMonth() + 1;
    let dayStr = day < 10 ? `0${day}` : day;
    let monthStr = month < 10 ? `0${month}` : month;
    if (containYear) {
      return `${dayStr}/${monthStr}/${clone.getFullYear()}`;
    }
    return `${dayStr}/${monthStr}`;
  }

  public static getDaysInMonth(month: number, year: number) {
    if (month <= 0 || month > 12 || year <= 0)
      return 0;
    return new Date(year, month, 0).getDate();
  }

  public static getDiffDays(date1: Date, date2: Date) {
    if (!date1 || !date2)
      return 0;

    const d1 = new Date(new Date(date1).setHours(23, 0, 0, 0));
    const d2 = new Date(new Date(date2).setHours(23, 0, 0, 0));

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  public static compare(date1: Date, date2: Date) {
    const d1 = new Date(new Date(date1).setHours(23, 0, 0, 0));
    const d2 = new Date(new Date(date2).setHours(23, 0, 0, 0));
    return d1.getTime() - d2.getTime();
  }

  public static getDayVietnamName(date?: Date) {
    let dayInWeek = -1;
    if (!date) {
      dayInWeek = new Date().getDay();
    } else {
      dayInWeek = new Date(date).getDay();
    }
    if (dayInWeek == 0) {
      return "Chủ nhật";
    }
    return `Thứ ${dayInWeek + 1}`;
  }

  public static displayTimeAgo(time: Date) {
    const now = new Date().getTime();
    const totalSeconds = Math.max((now - new Date(time).getTime()) / 1000, 0);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    if (hours < 1) {
      if (minutes < 1) {
        if (seconds <= 30) {
          return "Vừa xong";
        }
        return `${seconds}s ago`;
      }
      return `${minutes}m ago`;
    }
    if (hours < 24) {
      return `${hours}h ago`;
    }
    return `${Math.floor(hours / 24)}d ago`;
  }
}
