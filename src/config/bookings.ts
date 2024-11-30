import { BUNGALOV_IDS } from './bungalovs';

interface BookingConfigItem {
  unavailableDates: string[];
}

export interface BookingConfig {
  [key: string]: BookingConfigItem;
}

interface Term {
  id: string;
  text: string;
}

export const terms: Term[] = [
  {
    id: 'terms1',
    text: 'Evlilik cüzdanına sahip olduğumu onaylıyorum.'
  },
  {
    id: 'terms2',
    text: 'Yanımda evcil hayvan getirmeyeceğimi onaylıyorum.'
  },
  {
    id: 'terms3',
    text: '<a href="/terms" target="_blank" rel="noopener noreferrer" style="color: #1976d2; text-decoration: underline;">Kullanım şartlarını</a> okudum ve onaylıyorum.'
  }
];

// Using let instead of const to allow modifications
export let bookingConfig: BookingConfig = {
  [BUNGALOV_IDS.FIRST]: {
    unavailableDates: [
      '2024-12-01',
      '2024-12-02',
      '2024-12-03',
      '2024-12-15',
      '2024-12-16',
    ]
  },
  [BUNGALOV_IDS.SECOND]: {
    unavailableDates: [
      '2024-01-05',
      '2024-01-06',
      '2024-01-07',
      '2024-01-20',
      '2024-01-21',
    ]
  },
};
