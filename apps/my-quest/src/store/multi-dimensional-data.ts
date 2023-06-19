import { atom } from 'jotai';

import {
  TabMap,
  TabOrderType,
  ComponentsPk,
  TemplateMap,
  TemplateOrderType,
} from '~/types/multi-dimensional-data';

export const tabsAtom = atom<TabMap | null>(null);
export const tabsOrdersAtom = atom<TabOrderType>([]);
export const selectedTabPkAtom = atom<ComponentsPk>(0);

export const templatesAtom = atom<TemplateMap | null>(null);
export const templatesOrdersAtom = atom<TemplateOrderType | null>(null);
