export enum PropertyType {
  APARTMENT = "apartment",
  VILLA = "villa",
}

// CONSTANTS
export const PROPERTY_TYPE = [
  {
    value: "",
    label: {
      en: "",
      ar: "",
    },
  },
  {
    value: "apartment",
    label: {
      en: "Apartment",
      ar: "شقة",
    },
  },
  {
    value: "villa",
    label: {
      en: "Villa",
      ar: "فيلا",
    },
  },
  {
    value: "townhouse",
    label: {
      en: "Townhouse",
      ar: "تاون هاوس",
    },
  },
  {
    value: "penthouse",
    label: {
      en: "Penthouse",
      ar: "بنتهاوس",
    },
  },
  {
    value: "compound",
    label: {
      en: "Compound",
      ar: "مجمع سكني",
    },
  },
  {
    value: "duplex",
    label: {
      en: "Duplex",
      ar: "دوبلكس",
    },
  },
  {
    value: "full-floor",
    label: {
      en: "Full Floor",
      ar: "طابق كامل",
    },
  },
  {
    value: "half-floor",
    label: {
      en: "Half Floor",
      ar: "نصف طابق",
    },
  },
  {
    value: "whole-building",
    label: {
      en: "Whole Building",
      ar: "مبنى كامل",
    },
  },
  {
    value: "land",
    label: {
      en: "Land",
      ar: "أرض",
    },
  },
  {
    value: "bulk-sale-unit",
    label: {
      en: "Bulk Sale Unit",
      ar: "وحدة بيع بالجملة",
    },
  },
  {
    value: "bungalow",
    label: {
      en: "Bungalow",
      ar: "بنغلو",
    },
  },
  {
    value: "hotel-and-hotel-apartment",
    label: {
      en: "Hotel & Hotel Apartment",
      ar: "فندق وشقة فندقية",
    },
  },
];

export const AMENITIES = [
  { value: "AC", label: { en: "Central A/C", ar: "تكييف مركزي" } },
  { value: "MR", label: { en: "Maids Room", ar: "غرفة خادمة" } },
  { value: "BA", label: { en: "Balcony", ar: "شرفة" } },
  { value: "SP", label: { en: "Shared Pool", ar: "مسبح مشترك" } },
  { value: "SS", label: { en: "Shared Spa", ar: "منتجع صحي مشترك" } },
  { value: "SY", label: { en: "Shared Gym", ar: "صالة رياضية مشتركة" } },
  { value: "CS", label: { en: "Concierge Service", ar: "خدمة الكونسيرج" } },
  { value: "CP", label: { en: "Covered Parking", ar: "موقف سيارات مغطى" } },
  { value: "VW", label: { en: "View of Water", ar: "إطلالة على الماء" } },
  { value: "BL", label: { en: "View of Landmark", ar: "إطلالة على معلم" } },
  { value: "PA", label: { en: "Pets Allowed", ar: "يسمح بالحيوانات الأليفة" } },
  { value: "ST", label: { en: "Study", ar: "غرفة دراسة" } },
  { value: "PG", label: { en: "Private Garden", ar: "حديقة خاصة" } },
  { value: "PP", label: { en: "Private Pool", ar: "مسبح خاص" } },
  { value: "PY", label: { en: "Private Gym", ar: "صالة رياضية خاصة" } },
  { value: "PJ", label: { en: "Private Jacuzzi", ar: "جاكوزي خاص" } },
  { value: "BW", label: { en: "Built in Wardrobes", ar: "خزائن مدمجة" } },
  { value: "WC", label: { en: "Walk-in Closet", ar: "غرفة ملابس" } },
];
