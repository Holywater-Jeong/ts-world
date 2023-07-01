import { useAtom, useAtomValue } from 'jotai';

import { ComponentsPk, TemplateType, ItemType } from '~/types/multi-dimensional-data';

import {
  selectedTabPkAtom,
  templatesAtom,
  templatesOrdersAtom,
  itemsAtom,
  itemsOrdersAtom,
} from '~/store/multi-dimensional-data';

import { Item } from './Items';

export const Templates = () => {
  const selectedTabPk = useAtomValue(selectedTabPkAtom);
  const [templatesOrders, setTemplatesOrders] = useAtom(templatesOrdersAtom);
  const [templates, setTemplates] = useAtom(templatesAtom);

  const templatesBySelectedTab = templatesOrders?.get(selectedTabPk);

  const addTemplate = () => {
    const pkNum = templates?.size ? templates.size + 1 : 1;

    const newTemplatePk = `new-template-${pkNum}`;
    const newTemplate: TemplateType = {
      pk: newTemplatePk,
      name: `새로운 템플릿 ${pkNum}`,
    };

    setTemplates((prevTemplates) => new Map(prevTemplates).set(newTemplatePk, newTemplate));
    setTemplatesOrders((prevTemplatesOrders) => {
      const prevTemplatesOrdersMap = new Map(prevTemplatesOrders);
      const prevOrders = prevTemplatesOrdersMap?.get(selectedTabPk);

      prevTemplatesOrdersMap?.set(
        selectedTabPk,
        prevOrders ? [newTemplatePk, ...prevOrders] : [newTemplatePk],
      );

      return prevTemplatesOrdersMap;
    });
  };

  return (
    <div className="flex flex-col justify-start">
      <button className="border border-2 border-black" onClick={addTemplate}>
        템플릿 추가 +
      </button>
      {templatesBySelectedTab?.map((templatePk) => (
        <Template key={templatePk} templatePk={templatePk} />
      ))}
    </div>
  );
};

const Template = ({ templatePk }: { templatePk: ComponentsPk }) => {
  const templates = useAtomValue(templatesAtom);

  const [items, setItems] = useAtom(itemsAtom);
  const [itemsOrders, setItemsOrders] = useAtom(itemsOrdersAtom);

  const template = templates?.get(templatePk);
  const itemsByTemplate = itemsOrders?.get(templatePk);

  const addProduct = () => {
    const pkNum = items?.size ? items.size + 1 : 1;

    const newItemPk = `new-template-${pkNum}`;
    const newItem: ItemType = {
      pk: newItemPk,
      name: `새로운 아이템 ${pkNum}`,
    };

    setItems((prevItems) => new Map(prevItems).set(newItemPk, newItem));
    setItemsOrders((prevItemsOrders) => {
      const prevItemsOrdersMap = new Map(prevItemsOrders);
      const prevOrders = prevItemsOrdersMap?.get(templatePk);

      prevItemsOrdersMap?.set(templatePk, prevOrders ? [newItemPk, ...prevOrders] : [newItemPk]);

      return prevItemsOrdersMap;
    });
  };

  if (!template) return null;
  return (
    <div className="flex flex-col justify-start border border-2 border-black my-1.5">
      <div>{template.name}</div>
      <button className="border border-2 border-neutral-300" onClick={addProduct}>
        상품 추가 +
      </button>
      {itemsByTemplate?.map((itemPk) => (
        <Item key={itemPk} itemPk={itemPk} />
      ))}
    </div>
  );
};
