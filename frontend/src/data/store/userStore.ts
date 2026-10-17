import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ActivityEntry, Locale, LocalizedText } from '@/types';

/**
 * Bumped from v1 because the shape below gained the registration, check-in,
 * interest and settings slices. The version lives in the key so an incompatible
 * change makes old data ignored rather than half-applied.
 */
const KEY = 'rentak.user.v3';

export type RegistrationPass = {
  festivalName: LocalizedText;
  title: LocalizedText;
  startAt: string;
  venueName: LocalizedText;
  note?: LocalizedText;
}

/** A booked place on an Event or a Workshop. Must render offline — it is the pass. */
export type Registration = {
  id: string;
  kind: 'event' | 'workshop';
  /** The Event or Workshop id, depending on `kind`. */
  targetId: string;
  /** Shown on 18 as the booking reference. */
  reference: string;
  createdAt: string;              // ISO 8601
  pass: RegistrationPass;
};

/**
 * Earned on site. Written locally first and reconciled later — these happen in
 * venues with no signal, so a check-in must never wait on a network call.
 */
export type CheckIn = {
  id: string;
  venueId: string;
  eventId?: string;
  at: string;                     // ISO 8601
  /** False until the server has acknowledged it. Always true in Phase 1. */
  synced: boolean;
};

/** Earned by checking in; the cultural passport is the collection of these. */
export type PassportStamp = {
  id: string;
  artFormId: string;
  earnedAt: string;               // ISO 8601
};

/**
 * Per-purpose, timestamped consent. Every research or analytics call must read
 * this first — a toggle that gates nothing is worse than no toggle.
 */
export type ConsentPurpose = 'research' | 'analytics' | 'personalisation';

export type Consent = {
  purpose: ConsentPurpose;
  granted: boolean;
  decidedAt: string;              // ISO 8601
};

export type TextSize = 'default' | 'large' | 'largest';

export type Settings = {
  /** Null until screen 02 asks. The i18n layer falls back to 'ms' meanwhile. */
  locale: Locale | null;
  /** For Kelantanese and dialect performances — a preference, not a locale. */
  performanceSubtitles: boolean;
  notificationPrefs: { eventReminders: boolean; nearbyFestivals: boolean; weeklyStory: boolean };
  quietHours: { from: string; to: string } | null;   // 'HH:mm'
  textSize: TextSize;
  boldText: boolean;
  reduceMotion: boolean;
};

export type UserState = {
  name: string;
  savedFestivalIds: string[];
  recentActivity: ActivityEntry[];
  /** Art-form ids chosen on 09, driving recommendations elsewhere. */
  interests: string[];
  registrations: Registration[];
  checkIns: CheckIn[];
  stamps: PassportStamp[];
  /** Challenge id → count so far. The definitions are content; this is progress. */
  challengeProgress: Record<string, number>;
  earnedBadgeIds: string[];
  consents: Consent[];
  settings: Settings;
  downloads: string[];
  session: Session;
  onboarding: Onboarding;
};

export type Session = {
  kind: 'guest' | 'account';
  name?: string;
  email?: string;
  verifiedAt?: string;
};

export type Onboarding = {
  languageChosen: boolean;
  seenSlides: boolean;
  interestsSet: boolean;
};

const defaultSettings: Settings = {
  locale: null,
  performanceSubtitles: false,
  notificationPrefs: { eventReminders: true, nearbyFestivals: true, weeklyStory: true },
  quietHours: null,
  textSize: 'default',
  boldText: false,
  reduceMotion: false,
};

const defaultSession: Session = { kind: 'guest' };

const defaultOnboarding: Onboarding = {
  languageChosen: false,
  seenSlides: false,
  interestsSet: false,
};

export const defaultState: UserState = {
  name: 'Hakumu',                       // placeholder until Profile can edit it
  savedFestivalIds: [],
  recentActivity: [
    { id: 'a1', kind: 'stamp',        labelKey: 'content.activity.stampDikir', daysAgo: 2 },
    { id: 'a2', kind: 'registration', labelKey: 'content.activity.randaiReg',  daysAgo: 5 },
  ],
  interests: [],
  registrations: [],
  checkIns: [],
  stamps: [],
  challengeProgress: {},
  earnedBadgeIds: [],
  consents: [],
  settings: defaultSettings,
  downloads: [],
  session: defaultSession,
  onboarding: defaultOnboarding, 
};

export async function loadUserState(): Promise<UserState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return defaultState;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return defaultState;

    const stored = parsed as Partial<UserState>;

    return {
      ...defaultState,
      ...stored,
      // `settings` is the one nested object, so a shallow spread would drop any
      // field a newer app version added. Merge it a level deeper.
      settings: { ...defaultSettings, ...(stored.settings ?? {}) },
      session: { ...defaultSession, ...(stored.session ?? {}) },
      onboarding: { ...defaultOnboarding, ...(stored.onboarding ?? {}) },
    };
  } catch {
    return defaultState;
  }
}

export async function saveUserState(state: UserState): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}

/** Forget everything on this device — the next load returns `defaultState`. */
export async function clearUserState(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
