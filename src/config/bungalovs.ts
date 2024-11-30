export interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface BungalovData {
  id: string;
  name: string;
  description: string;
  mainImage: string;
  features: Feature[];
}

const BUNGALOV_1_ID = 'bungalov1';
const BUNGALOV_2_ID = 'bungalov2';

export const BUNGALOV_IDS = {
  FIRST: BUNGALOV_1_ID,
  SECOND: BUNGALOV_2_ID,
} as const;

export const BUNGALOV_NAMES = {
  [BUNGALOV_1_ID]: 'Forest',
  [BUNGALOV_2_ID]: 'Breeze',
} as const;

export const BUNGALOV_PATHS = {
  [BUNGALOV_1_ID]: '/bungalov/images/bungalov1',
  [BUNGALOV_2_ID]: '/bungalov/images/bungalov2',
} as const;

export const bungalovs: Record<string, BungalovData> = {
  [BUNGALOV_1_ID]: {
    id: BUNGALOV_1_ID,
    name: BUNGALOV_NAMES[BUNGALOV_1_ID],
    description: 'Modern olanaklarla donatılmış premium bungalov Forest ile doğada lüksü deneyimleyin. Evinizin tüm konforunu sunarken doğayla iç içe huzurlu bir kaçamak arayanlar için mükemmel bir seçim.',
    mainImage: `${BUNGALOV_PATHS[BUNGALOV_1_ID]}/main.webp`,
    features: [
      {
        id: 'pool',
        title: 'Özel Havuz',
        description: 'Doğayla çevrili özel havuzunuzda serinleyin. Isıtmalı havuz, mevsim ne olursa olsun konforlu yüzme imkanı sağlar.',
        image: `${BUNGALOV_PATHS[BUNGALOV_1_ID]}/pool.webp`
      },
      {
        id: 'jacuzzi',
        title: 'Açık Hava Jakuzi',
        description: 'Çevredeki doğal manzaranın keyfini çıkarırken son teknoloji jakuzimizde rahatlayın.',
        image: `${BUNGALOV_PATHS[BUNGALOV_1_ID]}/jacuzzi.webp`
      },
      {
        id: 'barbecue',
        title: 'Modern Mangal Alanı',
        description: 'Açık havada yemek keyfi için donanımlı mangal alanımızda sevdiğiniz yemekleri pişirin.',
        image: `${BUNGALOV_PATHS[BUNGALOV_1_ID]}/barbecue.webp`
      },
      {
        id: 'fireplace',
        title: 'İç Mekan Şömine',
        description: 'Serin akşamlarda şık iç mekan şöminemizle mükemmel bir ambiyans yaratın.',
        image: `${BUNGALOV_PATHS[BUNGALOV_1_ID]}/fireplace.webp`
      },
      {
        id: 'firepit',
        title: 'Açık Hava Ateş Çukuru',
        description: 'Akşam sohbetleri ve yıldızları izlemek için ateş çukurunun etrafında toplanın.',
        image: `${BUNGALOV_PATHS[BUNGALOV_1_ID]}/firepit.webp`
      },
      {
        id: 'inside',
        title: 'Lüks İç Mekan',
        description: 'Modern mobilyalar ve premium olanaklar konforlu ve şık bir konaklama sağlar.',
        image: `${BUNGALOV_PATHS[BUNGALOV_1_ID]}/inside.webp`
      },
      {
        id: 'central',
        title: 'Merkezi Konum',
        description: 'Hem özel hem de kullanışlı bir konumda, yerel cazibe merkezlerine kolay erişim.',
        image: `${BUNGALOV_PATHS[BUNGALOV_1_ID]}/central.webp`
      }
    ]
  },
  [BUNGALOV_2_ID]: {
    id: BUNGALOV_2_ID,
    name: BUNGALOV_NAMES[BUNGALOV_2_ID],
    description: 'Breeze, çağdaş konfor ve doğal güzelliğin benzersiz bir karışımını sunar. Bu geniş bungalov, lüks bir konaklama sağlarken doğayla samimi bir bağlantıyı kurmanıza olanak tanır.',
    mainImage: `${BUNGALOV_PATHS[BUNGALOV_2_ID]}/main.webp`,
    features: [
      {
        id: 'pool',
        title: 'Sonsuzluk Havuzu',
        description: 'Etkileyici sonsuzluk havuzumuz ufukla birleşerek yüzerken nefes kesici manzaralar sunar.',
        image: `${BUNGALOV_PATHS[BUNGALOV_2_ID]}/pool.webp`
      },
      {
        id: 'jacuzzi',
        title: 'Premium Jakuzi',
        description: 'Terapötik jetler ve ambiyans ışıklandırması ile donatılmış premium jakuzimizde rahatlayın.',
        image: `${BUNGALOV_PATHS[BUNGALOV_2_ID]}/jacuzzi.webp`
      },
      {
        id: 'barbecue',
        title: 'Gurme Mangal İstasyonu',
        description: 'Mükemmel bir mutfak deneyimi için tam donanımlı açık hava mutfağı ve mangal alanı.',
        image: `${BUNGALOV_PATHS[BUNGALOV_2_ID]}/barbecue.webp`
      },
      {
        id: 'fireplace',
        title: 'Modern Şömine',
        description: 'Hem ısı kaynağı hem de etkileyici bir odak noktası olan çağdaş şömine tasarımı.',
        image: `${BUNGALOV_PATHS[BUNGALOV_2_ID]}/fireplace.webp`
      },
      {
        id: 'firepit',
        title: 'Manzaralı Ateş Çukuru',
        description: 'Konforlu oturma alanları ve panoramik manzaralarla yükseltilmiş bir ateş çukuru deneyimi.',
        image: `${BUNGALOV_PATHS[BUNGALOV_2_ID]}/firepit.webp`
      },
      {
        id: 'inside',
        title: 'Zarif İç Mekan',
        description: 'Özenle dekore edilmiş iç mekanlarımızda sofistike tasarım konforla buluşuyor.',
        image: `${BUNGALOV_PATHS[BUNGALOV_2_ID]}/inside.webp`
      },
      {
        id: 'central',
        title: 'Ayrıcalıklı Konum',
        description: 'Doğanın içinde konumlanmış olmasına rağmen temel olanaklara ve cazibe merkezlerine yakın mesafede.',
        image: `${BUNGALOV_PATHS[BUNGALOV_2_ID]}/central.webp`
      }
    ]
  }
};
