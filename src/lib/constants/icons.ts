export const ICONS = {
    LOGO: "logo",
} as const;

export type IconName = typeof ICONS[keyof typeof ICONS];