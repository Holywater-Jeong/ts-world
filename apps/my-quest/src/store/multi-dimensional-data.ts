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

export const tabsAtom = atom<TabMap>(new Map());
export const tabsOrdersAtom = atom<TabOrderType>([]);
export const selectedTabPkAtom = atom<ComponentsPk>(0);

export const templatesAtom = atom<TemplateMap>(new Map());
export const templatesOrdersAtom = atom<TemplateOrderType>(new Map());

export const itemsAtom = atom<ItemMap>(new Map());
export const itemsOrdersAtom = atom<ItemOrderType>(new Map());
