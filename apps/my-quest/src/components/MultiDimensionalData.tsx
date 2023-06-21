'use client';
import { useEffect } from 'react';
import { useSetAtom, useAtomValue, useAtom } from 'jotai';

import {
  TabEntity,
  TabMap,
  TabOrderType,
  TemplateMap,
  TemplateOrderType,
  ComponentsPk,
  TabType,
  TemplateType,
  ItemType,
  ItemMap,
  ItemOrderType,
} from '~/types/multi-dimensional-data';

import {
  tabsAtom,
  tabsOrdersAtom,
  selectedTabPkAtom,
  templatesAtom,
  templatesOrdersAtom,
  itemsAtom,
  itemsOrdersAtom,
} from '~/store/multi-dimensional-data';

/**
 * temp data
 */
const originShoppingTabs: TabEntity[] = [
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

export const MultiDimensionalData = () => {
  const setTabs = useSetAtom(tabsAtom);
  const setTabsOrder = useSetAtom(tabsOrdersAtom);

  const setSelectedTabPk = useSetAtom(selectedTabPkAtom);

  const setTemplates = useSetAtom(templatesAtom);
  const setTemplatesOrders = useSetAtom(templatesOrdersAtom);

  const setItems = useSetAtom(itemsAtom);
  const setItemsOrders = useSetAtom(itemsOrdersAtom);

  const initTabs = () => {
    const tabs: TabMap = new Map();
    const tabsOrders: TabOrderType = [];

    const templates: TemplateMap = new Map();
    const templatesOrders: TemplateOrderType = new Map();

    const items: ItemMap = new Map();
    const itemsOrders: ItemOrderType = new Map();

    originShoppingTabs.forEach((tab) => {
      const tabPk = tab.pk;

      tabsOrders.push(tabPk);
      tabs.set(tabPk, { pk: tabPk, name: tab.name });

      const templateOrdersForSet: ComponentsPk[] = [];

      tab.templates?.forEach((template) => {
        const templatePk = template.pk;
        templateOrdersForSet.push(templatePk);
        templates.set(templatePk, template);

        const itemOrdersForSet: ComponentsPk[] = [];

        template.items?.forEach((item) => {
          const itemPk = item.pk;
          itemOrdersForSet.push(item.pk);
          items.set(itemPk, item);
        });

        itemsOrders.set(templatePk, itemOrdersForSet);
      });

      templatesOrders.set(tabPk, templateOrdersForSet);
    });

    setTabsOrder(tabsOrders);
    setTabs(tabs);

    setSelectedTabPk(tabsOrders[0]);

    setTemplates(templates);
    setTemplatesOrders(templatesOrders);

    setItems(items);
    setItemsOrders(itemsOrders);
  };

  useEffect(() => {
    initTabs();
  });

  return (
    <div className="flex flex-col justify-between w-full">
      <Tabs />
      <Templates />
    </div>
  );
};

const Tabs = () => {
  const [tabs, setTabs] = useAtom(tabsAtom);
  const [tabsOrders, setTabsOrders] = useAtom(tabsOrdersAtom);
  const setSelectedTabPk = useSetAtom(selectedTabPkAtom);

  const tabsForComponent = tabsOrders.map((tabOrder) => {
    const tab = tabs?.get(tabOrder);
    return tab;
  });

  const addTab = () => {
    // 추가
    const newTabPk = `new-tab-${tabs?.size ? tabs.size + 1 : 1}`;
    const newTab: TabType = {
      pk: newTabPk,
      name: `새로운 탭`,
    };

    setTabs((prevTabs) => new Map(prevTabs).set(newTabPk, newTab));
    setTabsOrders((prevTabsOrders) => [newTabPk, ...prevTabsOrders]);
    setSelectedTabPk(newTabPk);
  };

  return (
    <div className="flex justify-start mb-1.5">
      <button className="border border-2 border-black" onClick={addTab}>
        탭 추가 +
      </button>
      {tabsForComponent.map((tab) => (
        <Tab key={tab?.name} {...tab} />
      ))}
    </div>
  );
};

const Tab = ({ name, pk }: Partial<TabType>) => {
  const setSelectedTabPk = useSetAtom(selectedTabPkAtom);

  if (!pk) return null;

  const handleTabClick = () => {
    setSelectedTabPk(pk);
  };

  return (
    <button className="border border-2 border-black" onClick={handleTabClick}>
      {name}
    </button>
  );
};

const Templates = () => {
  const selectedTabPk = useAtomValue(selectedTabPkAtom);
  const [templatesOrders, setTemplatesOrders] = useAtom(templatesOrdersAtom);
  const [templates, setTemplates] = useAtom(templatesAtom);

  const templatesBySelectedTab = templatesOrders?.get(selectedTabPk);

  const addTemplate = () => {
    const newTemplatePk = `new-template-${templates?.size ? templates.size + 1 : 1}`;
    const newTemplate: TemplateType = {
      pk: newTemplatePk,
      name: `새로운 템플릿`,
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

  if (!template) return null;

  const itemsForComponent = itemsOrders?.get(templatePk);

  const addProduct = () => {
    const newItemPk = `new-template-${items?.size ? items.size + 1 : 1}`;
    const newItem: ItemType = {
      pk: newItemPk,
      name: `새로운 아이템`,
    };

    setItems((prevItems) => new Map(prevItems).set(newItemPk, newItem));
    setItemsOrders((prevItemsOrders) => {
      const prevItemsOrdersMap = new Map(prevItemsOrders);
      const prevOrders = prevItemsOrdersMap?.get(templatePk);

      prevItemsOrdersMap?.set(templatePk, prevOrders ? [newItemPk, ...prevOrders] : [newItemPk]);

      return prevItemsOrdersMap;
    });
  };

  return (
    <div className="flex flex-col justify-start border border-2 border-black my-1.5">
      <div>{template.name}</div>
      <button className="border border-2 border-neutral-300" onClick={addProduct}>
        상품 추가 +
      </button>
      {itemsForComponent?.map((itemPk) => (
        <Item key={itemPk} itemPk={itemPk} />
      ))}
    </div>
  );
};

const Item = ({ itemPk }: { itemPk: ComponentsPk }) => {
  const items = useAtomValue(itemsAtom);

  const item = items?.get(itemPk);

  if (!item) return null;

  return <div>{item.name}</div>;
};
