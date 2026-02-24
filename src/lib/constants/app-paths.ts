import { Flatten } from "@/src/types/global.type";

export const APP_PATHS = {
    MAIN: "/",
    LOGIN: "/login",
} as const;

export type AppPath = Flatten<typeof APP_PATHS>;