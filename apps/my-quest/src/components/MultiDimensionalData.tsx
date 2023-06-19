'use client';
import { useEffect } from 'react';
import { atom, useSetAtom, useAtomValue } from 'jotai';

type Tab = Map<number, Pick<OriginShoppingTab, 'pk' | 'name'>>;
type Template = Map<number, OriginTemplate>;
type TemplatesOrders = Map<number, number[]>;

const tabsAtom = atom<Tab | null>(null);
const tabsOrdersAtom = atom<number[]>([]);
const selectedTabAtom = atom<number>(0);

const templatesAtom = atom<Template | null>(null);
const templatesOrdersAtom = atom<TemplatesOrders | null>(null);

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
    const tabsOrders: number[] = [];
    const tabs: Tab = new Map();
    const templates: Template = new Map();
    const templatesOrders = new Map<number, number[]>();

    originShoppingTabs.forEach((tab) => {
      tabsOrders.push(tab.pk);
      tabs.set(tab.pk, { pk: tab.pk, name: tab.name });

      const TemplateOrders: number[] = [];

      tab.templates?.forEach((template) => {
        templates.set(template.pk, template);
        TemplateOrders.push(template.pk);
      });

      templatesOrders.set(tab.pk, TemplateOrders);
    });

    setTabsOrder(tabsOrders);
    setTabs(tabs);
    setSelectedTab(tabsOrders[1]);
    setTemplates(templates);
    setTemplatesOrders(templatesOrders);
  };

  useEffect(() => {
    initTabs();
  });

  return (
    <div className="flex flex-col justify-between w-full">
      <div className="flex justify-between">
        <Tabs />
      </div>
      <div className="flex flex-col justify-start">
        <Templates />
      </div>
    </div>
  );
};

const Tabs = () => {
  const tabs = useAtomValue(tabsAtom);
  const tabsOrders = useAtomValue(tabsOrdersAtom);

  return (
    <>
      {tabsOrders.map((tabOrder) => {
        const tab = tabs?.get(tabOrder);

        return <div key={tab?.name}>{tab?.name}</div>;
      })}
    </>
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
    <>
      {templatesForComponent.map((template) => (
        <span key={template?.name}>{template?.name}</span>
      ))}
    </>
  );
};
