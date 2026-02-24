export const LOGO = {
  WIDTH: 40,
  HEIGHT: 37,
  TITLE: 14,
  SUB: 12,
} as const;

export type SizeNums = 
    | (typeof LOGO)[keyof typeof LOGO]