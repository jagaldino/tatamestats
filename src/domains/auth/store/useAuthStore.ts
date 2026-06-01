import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/shared/lib/storage/keys";
import { safeStorage } from "@/shared/lib/storage/localStorage";
import type {
  AuthResult,
  EntityId,
  LoginInput,
  RegisterInput,
  User,
} from "@/shared/types/domain";

type AuthState = {
  usersById: Record<EntityId, User>;
  userIds: EntityId[];
  currentUserId: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  register: (input: RegisterInput) => AuthResult;
  login: (input: LoginInput) => AuthResult;
  updateUser: (
    userId: EntityId,
    data: Partial<Pick<User, "name" | "email" | "password">>,
  ) => AuthResult;
  logout: () => void;
};

type AuthStore = AuthState & AuthActions;

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const createId = () =>
  globalThis.crypto?.randomUUID?.() ?? `user_${Date.now()}_${Math.random()}`;

const findUserByEmail = (usersById: Record<EntityId, User>, email: string) => {
  const normalized = normalizeEmail(email);
  return Object.values(usersById).find(
    (user) => normalizeEmail(user.email) === normalized,
  );
};

const initialState: AuthState = {
  usersById: {},
  userIds: [],
  currentUserId: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      register: (input) => {
        const email = normalizeEmail(input.email);
        const existing = findUserByEmail(get().usersById, email);

        if (existing) {
          return {
            ok: false,
            message: "Email ja cadastrado.",
          };
        }

        const userId = createId();
        const user: User = {
          id: userId,
          name: input.name.trim(),
          email,
          password: input.password,
        };

        set((state) => ({
          usersById: {
            ...state.usersById,
            [userId]: user,
          },
          userIds: [userId, ...state.userIds],
          currentUserId: userId,
          isAuthenticated: true,
        }));

        return {
          ok: true,
          userId,
        };
      },
      login: (input) => {
        const email = normalizeEmail(input.email);
        const user = findUserByEmail(get().usersById, email);

        if (!user || user.password !== input.password) {
          return {
            ok: false,
            message: "Credenciais invalidas.",
          };
        }

        set({
          currentUserId: user.id,
          isAuthenticated: true,
        });

        return {
          ok: true,
          userId: user.id,
        };
      },
      updateUser: (userId, data) => {
        const currentUser = get().usersById[userId];

        if (!currentUser) {
          return {
            ok: false,
            message: "Usuario nao encontrado.",
          };
        }

        const nextEmail = data.email
          ? normalizeEmail(data.email)
          : currentUser.email;
        const conflictingUser = Object.values(get().usersById).find(
          (user) =>
            user.id !== userId && normalizeEmail(user.email) === nextEmail,
        );

        if (conflictingUser) {
          return {
            ok: false,
            message: "Email ja cadastrado.",
          };
        }

        set((state) => ({
          usersById: {
            ...state.usersById,
            [userId]: {
              ...currentUser,
              name: data.name?.trim() ?? currentUser.name,
              email: nextEmail,
              password: data.password ?? currentUser.password,
            },
          },
        }));

        return {
          ok: true,
          userId,
        };
      },
      logout: () =>
        set((state) => ({
          usersById: state.usersById,
          userIds: state.userIds,
          currentUserId: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: STORAGE_KEYS.auth,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        usersById: state.usersById,
        userIds: state.userIds,
        currentUserId: state.currentUserId,
        isAuthenticated: state.isAuthenticated,
      }),
      version: 1,
    },
  ),
);

export const selectCurrentUser = (state: AuthState) =>
  state.currentUserId ? (state.usersById[state.currentUserId] ?? null) : null;
