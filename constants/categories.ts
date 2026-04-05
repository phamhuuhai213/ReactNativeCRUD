export const CATEGORIES = [
  'Điện tử',
  'Thời trang',
  'Gia dụng',
  'Thực phẩm',
  'Sách',
  'Đồ chơi',
  'Thể thao',
  'Khác',
] as const;

export type Category = (typeof CATEGORIES)[number];
