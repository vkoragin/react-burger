export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

interface ICookieOptions {
  path?: string;
  domain?: string;
  expires?: Date | string | number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none' | boolean;
}

export const setCookie = (name: string, value: string, options = {} as ICookieOptions) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  Object.keys(options).forEach((optionKey) => {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey as keyof ICookieOptions];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });

  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', { expires: -1 });
};

export const minPasswordLength = 6;

export const emailRegExp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const formatDate = (date: Date): string => {
  const today = new Date();
  const targetDate = new Date(date);
  let hours: string | number = targetDate.getHours();
  let minutes: string | number = targetDate.getMinutes();
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  const msInDay = 24 * 60 * 60 * 1000;
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  let dif: string | number = (+today - +targetDate) / msInDay;
  if (dif === 0) dif = 'Сегодня';
  if (dif === 1) dif = 'Вчера';
  if (Number(dif) > 1) dif += ' дн. назад';
  const timeZone = targetDate.getTimezoneOffset() / 60;
  return `${dif}, ${hours}:${minutes} i-GMT${timeZone > 0 ? timeZone : `+${timeZone * -1}`}`;
};
