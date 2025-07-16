import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Navigation from '@/components/Navigation';
import '../globals.css';

const locales = ['en', 'zh-CN', 'zh-HK', 'ko-KR', 'ru'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const titles = {
    'en': 'The Real Story Behind Bee Dog - Animal Protection Advocacy',
    'zh-CN': '蜜蜂狗的真实故事：呼吁保护动物',
    'ko-KR': '꿀벌강아지의 진실: 동물 보호를 위한 외침',
    'ru': 'Nastoyashchaya istoriya sobaki-pchely - Zashchita zhivotnykh'
  };

  const descriptions = {
    'en': 'What appeared to be a viral meme reveals a tragic truth about animal abuse. Join us in protecting innocent lives and raising awareness about animal welfare.',
    'zh-CN': '起初以为是网红梗图，实际却是动物虐待的悲惨真相。让我们一起保护无辜的生命，提高动物福利意识。',
    'ko-KR': '밈으로 시작된 이야기 뒤에 숨겨진 동물 학대의 비극적 진실. 무고한 생명을 보호하는 데 함께해 주세요.',
    'ru': 'To, chto kazalos\' virusnym memom, raskryvaet tragicheskuyu pravdu o zhestokom obrashchenii s zhivotnymi. Prisoediniaytes\' k nam v zashchite nevinnykh zhiznei.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles['en'],
    description: descriptions[locale as keyof typeof descriptions] || descriptions['en'],
    keywords: locale === 'zh-CN' ? 
      '动物保护, 动物福利, 反虐待, 动物权益, 倡导, 保护动物' :
      locale === 'zh-HK' ?
      '動物保護, 動物福利, 反虐待, 動物權益, 倡導, 保護動物' :
      locale === 'ko-KR' ?
      '동물 보호, 동물 복지, 학대 방지, 동물 권리, 옹호, 보호' :
      locale === 'ru' ?
      'zashchita zhivotnykh, blagopoluchie zhivotnykh, predotvrashchenie zhestokosti, prava zhivotnykh, advokatsiya, sostradanie' :
      'animal protection, animal welfare, abuse prevention, animal rights, advocacy, compassion',
    metadataBase: new URL('https://bee-dog.com'),
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles['en'],
      description: descriptions[locale as keyof typeof descriptions] || descriptions['en'],
      type: 'website',
      locale: locale === 'ru' ? 'ru_RU' : locale === 'zh-CN' ? 'zh_CN' : locale === 'zh-HK' ? 'zh_HK' : locale === 'ko-KR' ? 'ko_KR' : 'en_US',
      images: [
        {
          url: '/bee-dog.jpg',
          width: 1200,
          height: 630,
          alt: 'Animal Protection Advocacy - Standing for Animal Welfare'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles['en'],
      description: descriptions[locale as keyof typeof descriptions] || descriptions['en'],
      images: ['/bee-dog.jpg']
    },
    robots: {
      index: true,
      follow: true
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh-CN': '/zh-CN',
        'zh-HK': '/zh-HK',
        'ko-KR': '/ko-KR',
        'ru': '/ru'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Animal Protection Advocacy',
    description: locale === 'zh-CN' ? 
      '动物保护倡导组织，致力于预防动物虐待，提高动物福利意识' :
      locale === 'zh-HK' ?
      '動物保護倡導組織，致力於預防動物虐待，提高動物福利意識' :
      locale === 'ko-KR' ?
      '동물 보호 옹호 단체, 동물 학대 방지 및 복지 인식 제고' :
      locale === 'ru' ?
      'Organizatsiya po zashchite zhivotnykh, posvyashchennaya predotvrashcheniyu zhestokogo obrashcheniya i povysheniyu osvedomlennosti o blagopoluchii' :
      'Animal protection advocacy organization dedicated to preventing abuse and raising welfare awareness',
    url: `https://bee-dog.com/${locale}`,
    logo: 'https://bee-dog.com/bee-dog.jpg',
    sameAs: [
      'https://t.me/mifenggoutg',
      'https://x.com/i/communities/1943917664927109411'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Global'
    },
    missionStatement: locale === 'zh-CN' ?
      '我们相信每个动物都应得到保护、关爱和同情' :
      locale === 'zh-HK' ?
      '我們相信每個動物都應得到保護、關愛和同情' :
      locale === 'ko-KR' ?
      '우리는 모든 동물이 보호, 돌봄, 연민을 받을 자격이 있다고 믿습니다' :
      locale === 'ru' ?
      'My verim, chto kazhdoe zhivotnoe zasluzhivaet zashchity, zaboty i sostradaniya' :
      'We believe every animal deserves protection, care, and compassion',
    foundingDate: '2024',
    knowsAbout: ['Animal Welfare', 'Abuse Prevention', 'Community Education', 'Advocacy']
  };

  return (
    <html lang={locale} dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />

        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-gray-50">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 