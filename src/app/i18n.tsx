import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'th';

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Home Screen
  'home.greeting': { en: 'Good morning, Ploy', th: 'สวัสดีตอนเช้า, พลอย' },
  'home.noForgotten': { en: "You haven't forgotten anything", th: 'คุณยังไม่ลืมอะไรเลย' },
  'home.now': { en: 'Now', th: 'ตอนนี้' },
  'home.itemsDetected': { en: 'items detected', th: 'รายการที่ตรวจพบ' },
  'home.missing': { en: 'missing', th: 'หายไป' },
  'home.activeTrip': { en: 'Active Trip', th: 'ทริปปัจจุบัน' },
  'home.alarmsSet': { en: 'alarms set', th: 'ตั้งปลุก' },
  'home.departsIn': { en: 'Departs in', th: 'ออกเดินทางอีก' },
  'home.hours': { en: 'hours', th: 'ชั่วโมง' },
  'home.yourRoutines': { en: 'Your Routines', th: 'กิจวัตรของคุณ' },
  'home.lowBattery': { en: 'Low battery alert', th: 'แจ้งเตือนแบตเตอรี่ต่ำ' },
  'home.airtagLow': { en: 'AirTag on keys is at 12% battery', th: 'AirTag บนกุญแจเหลือแบตเตอรี่ 12%' },

  // Routine names
  'routine.university': { en: 'University', th: 'มหาวิทยาลัย' },
  'routine.office': { en: 'Office', th: 'ออฟฟิศ' },
  'routine.travel': { en: 'Travel', th: 'ท่องเที่ยว' },
  'routine.cafe': { en: 'Cafe Run', th: 'ไปคาเฟ่' },

  // Routine screen
  'routine.universityTitle': { en: 'University Routine', th: 'กิจวัตรมหาวิทยาลัย' },
  'routine.officeTitle': { en: 'Office Routine', th: 'กิจวัตรออฟฟิศ' },
  'routine.travelTitle': { en: 'Travel Routine', th: 'กิจวัตรท่องเที่ยว' },
  'routine.cafeTitle': { en: 'Cafe Run', th: 'ไปคาเฟ่' },
  'routine.itemsReady': { en: 'items ready', th: 'รายการพร้อมแล้ว' },
  'routine.of': { en: 'of', th: 'จาก' },
  'routine.save': { en: 'Save routine', th: 'บันทึกกิจวัตร' },
  'routine.saved': { en: 'Saved!', th: 'บันทึกแล้ว!' },
  'routine.addItem': { en: 'Add Item', th: 'เพิ่มรายการ' },
  'routine.itemName': { en: 'Item Name', th: 'ชื่อรายการ' },
  'routine.category': { en: 'Category', th: 'หมวดหมู่' },
  'routine.cancel': { en: 'Cancel', th: 'ยกเลิก' },

  // Pre-departure Screen
  'check.title': { en: 'Pre-departure Check', th: 'ตรวจสอบก่อนออกเดินทาง' },
  'check.allReady': { en: 'Perfect! All items ready', th: 'สมบูรณ์! รายการพร้อมทั้งหมด' },
  'check.almostThere': { en: 'Almost there', th: 'เกือบครบแล้ว' },
  'check.itemMissing': { en: 'item missing', th: 'รายการหายไป' },
  'check.itemsMissing': { en: 'items missing', th: 'รายการหายไป' },
  'check.readyToLeave': { en: 'Ready to Leave', th: 'พร้อมออกเดินทาง' },
  'check.addNewItem': { en: 'Add New Item', th: 'เพิ่มรายการใหม่' },
  'check.priorityLevel': { en: 'Priority Level', th: 'ระดับความสำคัญ' },
  'check.normal': { en: 'Normal', th: 'ปกติ' },
  'check.highPriority': { en: 'High Priority', th: 'สำคัญมาก' },
  'check.hasBLE': { en: 'Has BLE Tracker', th: 'มี BLE Tracker' },
  'check.addItem': { en: 'Add Item', th: 'เพิ่มรายการ' },
  'check.cancel': { en: 'Cancel', th: 'ยกเลิก' },

  // Missing items warning modal
  'check.warningTitle': { en: 'Missing Items Warning', th: 'คำเตือนรายการหายไป' },
  'check.warningMsg': { en: 'unchecked item(s). Are you sure you want to leave?', th: 'รายการที่ยังไม่ได้ตรวจสอบ คุณแน่ใจหรือไม่ว่าต้องการออกเดินทาง?' },
  'check.goBack': { en: 'Go Back', th: 'กลับไป' },
  'check.leaveAnyway': { en: 'Leave Anyway', th: 'ออกเดินทางเลย' },

  // Trip Detail Screen
  'trip.flight': { en: 'Flight', th: 'เที่ยวบิน' },
  'trip.departs': { en: 'Departs', th: 'ออกเดินทาง' },
  'trip.arrives': { en: 'Arrives', th: 'ถึง' },
  'trip.travelTime': { en: 'Travel time', th: 'เวลาเดินทาง' },
  'trip.itemsPacked': { en: 'Items packed', th: 'สิ่งของที่แพ็ค' },
  'trip.alarms': { en: 'Alarms', th: 'การแจ้งเตือน' },
  'trip.timeline': { en: 'Your departure timeline', th: 'ไทม์ไลน์การออกเดินทาง' },
  'trip.synced': { en: 'Synced with Calendar', th: 'ซิงค์กับปฏิทินแล้ว' },
  'trip.syncedDesc': { en: 'All alarms added to Google Calendar', th: 'เพิ่มการแจ้งเตือนทั้งหมดใน Google Calendar แล้ว' },

  // Trip steps
  'trip.checkPassport': { en: 'Check passport', th: 'ตรวจสอบหนังสือเดินทาง' },
  'trip.checkPassportDesc': { en: 'Verify expiry date & visa', th: 'ตรวจสอบวันหมดอายุ & วีซ่า' },
  'trip.leaveHome': { en: 'Leave home', th: 'ออกจากบ้าน' },
  'trip.leaveHomeDesc': { en: 'Call Grab to airport', th: 'เรียก Grab ไปสนามบิน' },
  'trip.checkIn': { en: 'Check-in', th: 'เช็คอิน' },
  'trip.checkInDesc': { en: 'TG counter, Terminal 1', th: 'เคาน์เตอร์ TG, เทอร์มินัล 1' },
  'trip.immigration': { en: 'Immigration', th: 'ตรวจคนเข้าเมือง' },
  'trip.immigrationDesc': { en: 'Fast track lane available', th: 'มีช่องทางด่วน' },
  'trip.dutyFree': { en: 'Duty free', th: 'ร้านปลอดภาษี' },
  'trip.dutyFreeDesc': { en: 'Pick up pre-order', th: 'รับสินค้าที่สั่งล่วงหน้า' },
  'trip.walkToGate': { en: 'Walk to gate', th: 'เดินไปประตูขึ้นเครื่อง' },
  'trip.walkToGateDesc': { en: 'Gate D7 • 15 min walk', th: 'ประตู D7 • เดิน 15 นาที' },
  'trip.boarding': { en: 'Boarding', th: 'ขึ้นเครื่อง' },
  'trip.boardingDesc': { en: 'Zone 2 • Seat 24A', th: 'โซน 2 • ที่นั่ง 24A' },

  // Find Item Screen
  'find.title': { en: 'Find lost item', th: 'ค้นหาของหาย' },
  'find.subtitle': { en: 'Use the map or ping to locate your things', th: 'ใช้แผนที่หรือ ping เพื่อหาตำแหน่งสิ่งของ' },
  'find.locationActive': { en: 'Location Active', th: 'ตำแหน่งทำงานอยู่' },
  'find.searching': { en: 'Searching...', th: 'กำลังค้นหา...' },
  'find.yourLocation': { en: 'Your location', th: 'ตำแหน่งของคุณ' },
  'find.lostItems': { en: 'Lost items', th: 'สิ่งของที่หาย' },
  'find.recentlyLost': { en: 'Recently lost', th: 'หายไปเมื่อเร็วๆ นี้' },
  'find.ping': { en: 'Ping', th: 'ส่งสัญญาณ' },
  'find.found': { en: 'Found', th: 'พบแล้ว' },
  'find.recovered': { en: 'Recovered', th: 'กู้คืนแล้ว' },
  'find.recoveredItems': { en: 'Recovered Items', th: 'สิ่งของที่กู้คืนแล้ว' },
  'find.editItem': { en: 'Edit Item', th: 'แก้ไขรายการ' },
  'find.saveChanges': { en: 'Save Changes', th: 'บันทึกการเปลี่ยนแปลง' },
  'find.away': { en: 'away', th: 'ห่างออกไป' },

  // Leaving Alert
  'alert.leavingHome': { en: "You're leaving home", th: 'คุณกำลังออกจากบ้าน' },
  'alert.forgotSomething': { en: 'But you forgot something important', th: 'แต่คุณลืมสิ่งสำคัญ' },
  'alert.lastSeen': { en: 'Last seen in bedroom', th: 'พบล่าสุดในห้องนอน' },
  'alert.goBack': { en: 'Go back for it', th: 'กลับไปเอา' },
  'alert.continueTrip': { en: 'Continue trip', th: 'เดินทางต่อ' },

  // Bottom Nav
  'nav.home': { en: 'Home', th: 'หน้าหลัก' },
  'nav.check': { en: 'Check', th: 'ตรวจสอบ' },
  'nav.trips': { en: 'Trips', th: 'ทริป' },
  'nav.find': { en: 'Find', th: 'ค้นหา' },

  // Common
  'common.back': { en: 'Back', th: 'กลับ' },
  'common.cancel': { en: 'Cancel', th: 'ยกเลิก' },
  'common.save': { en: 'Save', th: 'บันทึก' },
  'common.delete': { en: 'Delete', th: 'ลบ' },
  'common.edit': { en: 'Edit', th: 'แก้ไข' },
  'common.add': { en: 'Add', th: 'เพิ่ม' },
  'common.minsAgo': { en: 'mins ago', th: 'นาทีที่แล้ว' },
  'common.hourAgo': { en: 'hour ago', th: 'ชั่วโมงที่แล้ว' },
  'common.now': { en: 'Now', th: 'ตอนนี้' },

  // Categories
  'cat.essentials': { en: 'Essentials', th: 'ของจำเป็น' },
  'cat.electronics': { en: 'Electronics', th: 'อุปกรณ์อิเล็กทรอนิกส์' },
  'cat.documents': { en: 'Documents', th: 'เอกสาร' },
  'cat.personal': { en: 'Personal', th: 'ของส่วนตัว' },
  'cat.stationery': { en: 'Stationery', th: 'เครื่องเขียน' },
  'cat.health': { en: 'Health', th: 'สุขภาพ' },
  'cat.weather': { en: 'Weather', th: 'สภาพอากาศ' },
  'cat.bags': { en: 'Bags', th: 'กระเป๋า' },
  'cat.comfort': { en: 'Comfort', th: 'ความสะดวกสบาย' },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
