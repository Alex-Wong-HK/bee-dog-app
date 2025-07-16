import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'zh-CN', 'zh-HK', 'ko-KR', 'ru'];

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default,
    timeZone: locale === 'zh-CN' ? 'Asia/Shanghai' : 
              locale === 'zh-HK' ? 'Asia/Hong_Kong' :
              locale === 'ko-KR' ? 'Asia/Seoul' :
              locale === 'ru' ? 'Europe/Moscow' :
              'America/New_York'
  };
});

export {locales}; 