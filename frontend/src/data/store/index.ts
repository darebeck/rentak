/**
 * MUTABLE user state, persisted on device. Never mix content in here —
 * content is read-only and comes from `data/repositories/`.
 */
export { UserProvider, useUser } from './UserProvider';
export { loadUserState, saveUserState, clearUserState } from './userStore';
export type {
  UserState,
  Registration,
  CheckIn,
  PassportStamp,
  Consent,
  ConsentPurpose,
  Settings,
  TextSize,
} from './userStore';