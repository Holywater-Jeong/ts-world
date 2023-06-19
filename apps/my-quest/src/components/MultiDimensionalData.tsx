'use client';
import { useEffect } from 'react';
import { atom, useSetAtom, useAtomValue } from 'jotai';

type Orders = number[];

type TabType = Map<number, Pick<OriginShoppingTab, 'pk' | 'name'>>;
type TabOrderType = Orders;
type TemplateType = Map<number, OriginTemplate>;
type TemplateOrderType = Map<number, Orders>;

const tabsAtom = atom<TabType | null>(null);
const tabsOrdersAtom = atom<TabOrderType>([]);
const selectedTabAtom = atom<number>(0);

const templatesAtom = atom<TemplateType | null>(null);
const templatesOrdersAtom = atom<TemplateOrderType | null>(null);

type OriginShoppingTab = {
  pk: number;
  name: string;
  templates: OriginTemplate[];
};

type OriginTemplate = {
  pk: number;
  name: string;
  products: {
    pk: number;
    name: string;
  }[];
};

const originShoppingTabs: OriginShoppingTab[] = [
  {
    pk: 1,
    name: '쇼핑 탭 1',
    templates: [
      {
        pk: 1,
        name: '템플릿 1',
        products: [
          { pk: 1, name: '상품 1' },
          { pk: 2, name: '상품 2' },
          { pk: 3, name: '상품 3' },
        ],
      },
      {
        pk: 2,
        name: '템플릿 2',
        products: [
          { pk: 1, name: '상품 1' },
          { pk: 2, name: '상품 2' },
        ],
      },
    ],
  },
  {
    pk: 2,
    name: '쇼핑 탭 2',
    templates: [
      {
        pk: 3,
        name: '템플릿 3',
        products: [{ pk: 1, name: '상품 1' }],
      },
      {
        pk: 4,
        name: '템플릿 4',
        products: [
          { pk: 1, name: '상품 1' },
          { pk: 2, name: '상품 2' },
        ],
      },
      {
        pk: 5,
        name: '템플릿 5',
        products: [
          { pk: 1, name: '상품 1' },
          { pk: 2, name: '상품 2' },
        ],
      },
    ],
  },
];

export const MultiDimensionalData = () => {
  const setTabs = useSetAtom(tabsAtom);
  const setTabsOrder = useSetAtom(tabsOrdersAtom);
  const setSelectedTab = useSetAtom(selectedTabAtom);
  const setTemplates = useSetAtom(templatesAtom);
  const setTemplatesOrders = useSetAtom(templatesOrdersAtom);

  const initTabs = () => {
    const tabs: TabType = new Map();
    const tabsOrders: TabOrderType = [];

    const templates: TemplateType = new Map();
    const templatesOrders: TemplateOrderType = new Map();

    originShoppingTabs.forEach((tab) => {
      const tabPk = tab.pk;

      tabsOrders.push(tabPk);
      tabs.set(tabPk, { pk: tabPk, name: tab.name });

      const templateOrdersForSet: number[] = [];

      tab.templates?.forEach((template) => {
        const templatePk = template.pk;
        templates.set(templatePk, template);
        templateOrdersForSet.push(templatePk);
      });

      templatesOrders.set(tab.pk, templateOrdersForSet);
    });

    setTabsOrder(tabsOrders);
    setTabs(tabs);

    setSelectedTab(tabsOrders[0]);

    setTemplates(templates);
    setTemplatesOrders(templatesOrders);
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
  const tabs = useAtomValue(tabsAtom);
  const tabsOrders = useAtomValue(tabsOrdersAtom);

  return (
    <div className="flex justify-between">
      {tabsOrders.map((tabOrder) => {
        const tab = tabs?.get(tabOrder);

        return <div key={tab?.name}>{tab?.name}</div>;
      })}
    </div>
  );
};

const Templates = () => {
  const selectedTab = useAtomValue(selectedTabAtom);
  const templatesOrders = useAtomValue(templatesOrdersAtom);
  const templates = useAtomValue(templatesAtom);

  const selectedTabsTemplatesOrders = templatesOrders?.get(selectedTab);
  if (!selectedTabsTemplatesOrders) return null;

  const templatesForComponent = selectedTabsTemplatesOrders.map((template) =>
    templates?.get(template),
  );

  return (
    <div className="flex flex-col justify-start">
      {templatesForComponent.map((template) => (
        <span key={template?.name}>{template?.name}</span>
      ))}
    </div>
  );
};
