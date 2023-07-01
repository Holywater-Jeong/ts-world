'use client';
import { useEffect } from 'react';
import { useSetAtom, useAtom } from 'jotai';

import { ORIGIN_SHOPPING_TABS_DATA } from '~/constants';

import {
  ComponentsPk,
  Orders,
  PkOrderMap,
  TabType,
  TabMap,
  TemplateMap,
  ItemMap,
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

import { Templates } from './Templates';

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
    const tabsOrders: Orders = [];

    const templates: TemplateMap = new Map();
    const templatesOrders: PkOrderMap = new Map();

    const items: ItemMap = new Map();
    const itemsOrders: PkOrderMap = new Map();

    ORIGIN_SHOPPING_TABS_DATA.forEach((tab) => {
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
    const pkNum = tabs?.size ? tabs.size + 1 : 1;

    const newTabPk = `new-tab-${pkNum}`;
    const newTab: TabType = {
      pk: newTabPk,
      name: `새로운 탭 ${pkNum}`,
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
