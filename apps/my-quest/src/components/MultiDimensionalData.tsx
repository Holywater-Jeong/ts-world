'use client';
import { useEffect } from 'react';
import { atom, useSetAtom, useAtomValue } from 'jotai';

/**
 * common
 */
type Orders = number[];

/**
 * entity
 */
type TabEntity = {
  pk: number;
  name: string;
  templates: TemplateEntity[];
};

type TemplateEntity = {
  pk: number;
  name: string;
  products: {
    pk: number;
    name: string;
  }[];
};

/**
 * for state mangement & components
 */
type TabType = Pick<TabEntity, 'pk' | 'name'>;

type TabMap = Map<number, TabType>;
type TemplateMap = Map<number | string, TemplateEntity>;

type TabOrderType = Orders;
type TemplateOrderType = Map<number | string, Orders>;

/**
 * atom
 */

const tabsAtom = atom<TabMap | null>(null);
const tabsOrdersAtom = atom<TabOrderType>([]);
const selectedTabAtom = atom<number>(0);

const templatesAtom = atom<TemplateMap | null>(null);
const templatesOrdersAtom = atom<TemplateOrderType | null>(null);

/**
 * temp data
 */
const originShoppingTabs: TabEntity[] = [
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
    const tabs: TabMap = new Map();
    const tabsOrders: TabOrderType = [];

    const templates: TemplateMap = new Map();
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

  const tabsForComponent = tabsOrders.map((tabOrder) => {
    const tab = tabs?.get(tabOrder);
    return tab;
  });

  return (
    <div className="flex justify-between">
      {tabsForComponent.map((tab) => (
        <Tab key={tab?.name} {...tab} />
      ))}
    </div>
  );
};

const Tab = ({ name, pk }: TabType) => {
  const setSelectedTab = useSetAtom(selectedTabAtom);

  const handleTabClick = () => {
    setSelectedTab(pk);
  };

  return <div onClick={handleTabClick}>{name}</div>;
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
        <Template key={template?.name} name={template?.name} />
      ))}
    </div>
  );
};

const Template = ({ name }: TemplateEntity) => <div>{name}</div>;
