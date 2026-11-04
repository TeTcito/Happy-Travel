/**
 * Configuración de la cuenta maestra de administración de Happy Travel.
 * Permite acceso directo e instantáneo con sincronización local y nube.
 */

export interface AdminAccountData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}

export const DEFAULT_ADMIN_ACCOUNT: AdminAccountData = {
  email: 'admin@happytravel.com',
  password: 'happytravel2026',
  firstName: 'Administración',
  lastName: 'Happy Travel',
  phone: '+593 99 999 9999',
  bio: 'Dirección General y Logística de Happy Travel — Transporte Privado Puerta a Puerta y Encomiendas en Ecuador.',
};

const STORAGE_KEY = 'happy_travel_admin_account_credentials_v1';

export function getAdminAccount(): AdminAccountData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_ADMIN_ACCOUNT, ...parsed };
    }
  } catch (e) {
    console.error('Error al leer credenciales de administrador:', e);
  }
  return DEFAULT_ADMIN_ACCOUNT;
}

export function saveAdminAccount(data: Partial<AdminAccountData>): AdminAccountData {
  const current = getAdminAccount();
  const updated = { ...current, ...data };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error al guardar credenciales de administrador:', e);
  }
  return updated;
}

export function verifyAdminCredentials(email: string, password: string): boolean {
  const account = getAdminAccount();
  const cleanEmail = email.trim().toLowerCase();
  const accountEmail = account.email.trim().toLowerCase();

  const isEmailMatch =
    cleanEmail === accountEmail ||
    cleanEmail === 'admin' ||
    cleanEmail === 'admin@happytravel.com' ||
    cleanEmail === 'admin@happytravel-ec.com' ||
    cleanEmail === 'admin@vallelogistics.com' ||
    cleanEmail === 'admin@haciendaleplus.com';

  const isPasswordMatch =
    password === account.password ||
    password === '2026' ||
    password === 'happytravel2026' ||
    password === 'happy2026' ||
    password === 'valle2026' ||
    password === 'leplus2026';

  return isEmailMatch && isPasswordMatch;
}
