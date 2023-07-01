import { useAtomValue } from 'jotai';

import { ComponentsPk } from '~/types/multi-dimensional-data';

import { itemsAtom } from '~/store/multi-dimensional-data';

export const Item = ({ itemPk }: { itemPk: ComponentsPk }) => {
  const items = useAtomValue(itemsAtom);

  const item = items?.get(itemPk);

  if (!item) return null;
  return <div>{item.name}</div>;
};
