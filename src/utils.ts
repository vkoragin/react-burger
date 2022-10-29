export function getCookie(name: string) {
  const matches = document.cookie.match(
    // eslint-disable-next-line
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}

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
  if (dif > 1) dif += ' дн. назад';
  const timeZone = targetDate.getTimezoneOffset() / 60;
  return `${dif}, ${hours}:${minutes} i-GMT${
    timeZone > 0 ? timeZone : `+${timeZone * -1}`
  }`;
};
