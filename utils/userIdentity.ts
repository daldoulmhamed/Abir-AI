// utils/userIdentity.ts
import { v4 as uuidv4 } from 'uuid';

const USER_ID_KEY = 'abirai_userId';
const FULL_NAME_KEY = 'abirai_fullName';
const EMAIL_KEY = 'abirai_email';
const FULL_NAME_LOCKED_KEY = 'abirai_fullNameLocked';

export function getUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

export function getFullName(): string | null {
  return localStorage.getItem(FULL_NAME_KEY);
}

export function setFullName(name: string) {
  localStorage.setItem(FULL_NAME_KEY, name);
}

export function isFullNameLocked(): boolean {
  return localStorage.getItem(FULL_NAME_LOCKED_KEY) === '1';
}

export function lockFullName() {
  localStorage.setItem(FULL_NAME_LOCKED_KEY, '1');
}

export function getEmail(): string | null {
  return localStorage.getItem(EMAIL_KEY);
}

export function setEmail(email: string) {
  localStorage.setItem(EMAIL_KEY, email);
}

export function clearIdentity() {
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(FULL_NAME_KEY);
  localStorage.removeItem(EMAIL_KEY);
  localStorage.removeItem(FULL_NAME_LOCKED_KEY);
}
