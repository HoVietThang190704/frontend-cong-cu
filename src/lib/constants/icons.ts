export const ICONS = {
    LOGO: "Logo",
} as const;

export type IconName = typeof ICONS[keyof typeof ICONS];