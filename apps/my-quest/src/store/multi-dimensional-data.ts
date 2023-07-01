import { atom } from 'jotai';

import {
  ComponentsPk,
  Orders,
  PkOrderMap,
  TabMap,
  TemplateMap,
  ItemMap,
} from '~/types/multi-dimensional-data';

export const tabsAtom = atom<TabMap>(new Map());
export const tabsOrdersAtom = atom<Orders>([]);
export const selectedTabPkAtom = atom<ComponentsPk>(0);

export const templatesAtom = atom<TemplateMap>(new Map());
export const templatesOrdersAtom = atom<PkOrderMap>(new Map());

export const itemsAtom = atom<ItemMap>(new Map());
export const itemsOrdersAtom = atom<PkOrderMap>(new Map());
