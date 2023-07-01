import { TabEntity } from '~/types/multi-dimensional-data';

export const ORIGIN_SHOPPING_TABS_DATA: TabEntity[] = [
  {
    pk: 1,
    name: '탭 1',
    templates: [
      {
        pk: 1,
        name: '템플릿 1',
        items: [
          { pk: 1, name: '아이템 1' },
          { pk: 2, name: '아이템 2' },
          { pk: 3, name: '아이템 3' },
        ],
      },
      {
        pk: 2,
        name: '템플릿 2',
        items: [
          { pk: 4, name: '아이템 4' },
          { pk: 5, name: '아이템 5' },
        ],
      },
    ],
  },
  {
    pk: 2,
    name: '탭 2',
    templates: [
      {
        pk: 3,
        name: '템플릿 3',
        items: [{ pk: 1, name: '아이템 1' }],
      },
      {
        pk: 4,
        name: '템플릿 4',
        items: [
          { pk: 2, name: '아이템 2' },
          { pk: 3, name: '아이템 3' },
        ],
      },
      {
        pk: 5,
        name: '템플릿 5',
        items: [
          { pk: 4, name: '아이템 4' },
          { pk: 5, name: '아이템 5' },
        ],
      },
    ],
  },
];
