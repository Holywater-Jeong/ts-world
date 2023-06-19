'use client';
import { useEffect } from 'react';
import { atom, useSetAtom, useAtomValue, useAtom } from 'jotai';

/**
 * common
 */
type ComponentsPk = number | string;
type Orders = ComponentsPk[];

type WithComponentsPk = {
  pk: ComponentsPk;
};

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
  items: ItemEntity[];
};

type ItemEntity = {
  pk: number;
  name: string;
};

/**
 * for state mangement & components
 */
type TabType = Pick<TabEntity, 'name'> & WithComponentsPk;
type TemplateType = Omit<TemplateEntity, 'pk'> & WithComponentsPk;

type TabMap = Map<ComponentsPk, TabType>;
type TemplateMap = Map<ComponentsPk, TemplateType>;

type TabOrderType = Orders;
type TemplateOrderType = Map<ComponentsPk, Orders>;

/**
 * atom
 */

const tabsAtom = atom<TabMap | null>(null);
const tabsOrdersAtom = atom<TabOrderType>([]);
const selectedTabPkAtom = atom<ComponentsPk>(0);

const templatesAtom = atom<TemplateMap | null>(null);
const templatesOrdersAtom = atom<TemplateOrderType | null>(null);

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

  const initTabs = () => {
    const tabs: TabMap = new Map();
    const tabsOrders: TabOrderType = [];

    const templates: TemplateMap = new Map();
    const templatesOrders: TemplateOrderType = new Map();

    originShoppingTabs.forEach((tab) => {
      const tabPk = tab.pk;

      tabsOrders.push(tabPk);
      tabs.set(tabPk, { pk: tabPk, name: tab.name });

      const templateOrdersForSet: ComponentsPk[] = [];

      tab.templates?.forEach((template) => {
        const templatePk = template.pk;
        templates.set(templatePk, template);
        templateOrdersForSet.push(templatePk);
      });

      templatesOrders.set(tab.pk, templateOrdersForSet);
    });

    setTabsOrder(tabsOrders);
    setTabs(tabs);

    setSelectedTabPk(tabsOrders[0]);

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
    <div className="flex justify-start">
      <button className="border border-2 border-black" onClick={addTab}>
        탭 추가 +
      </button>
      {tabsForComponent.map((tab) => (
        <Tab key={tab?.name} {...tab} />
      ))}
    </div>
  );
};

const Tab = ({ name, pk }: TabType) => {
  const setSelectedTabPk = useSetAtom(selectedTabPkAtom);

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

  const selectedTabsTemplatesOrders = templatesOrders?.get(selectedTabPk);

  const templatesForComponent = selectedTabsTemplatesOrders?.map((template) =>
    templates?.get(template),
  );

  const addTemplate = () => {
    const newTemplatePk = `new-template-${templates?.size ? templates.size + 1 : 1}`;
    const newTemplate: TemplateType = {
      pk: newTemplatePk,
      name: `새로운 템플릿`,
      items: [],
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
      {templatesForComponent?.map((template) => (
        <Template key={template?.name} name={template?.name} />
      ))}
    </div>
  );
};

const Template = ({ name }: TemplateEntity) => <div>{name}</div>;
