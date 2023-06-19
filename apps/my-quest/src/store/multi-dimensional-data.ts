import { atom } from 'jotai';

import {
  TabMap,
  TabOrderType,
  ComponentsPk,
  TemplateMap,
  TemplateOrderType,
  ItemMap,
  ItemOrderType,
} from '~/types/multi-dimensional-data';

export const tabsAtom = atom<TabMap | null>(null);
export const tabsOrdersAtom = atom<TabOrderType>([]);
export const selectedTabPkAtom = atom<ComponentsPk>(0);

export const templatesAtom = atom<TemplateMap | null>(null);
export const templatesOrdersAtom = atom<TemplateOrderType | null>(null);

export const itemsAtom = atom<ItemMap | null>(null);
export const itemsOrdersAtom = atom<ItemOrderType | null>(null);
