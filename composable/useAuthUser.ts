import type { UserWithoutPassword } from "~/types";

export const useAuthUser = () => useState<UserWithoutPassword | null>('user', () => null)
export const useCookie = () => useState<string | null>('cookie', () => null)
