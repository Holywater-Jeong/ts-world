/**
 * common
 */
export type ComponentsPk = number | string;
export type Orders = ComponentsPk[];

export type WithComponentsPk = {
  pk: ComponentsPk;
};

/**
 * entity
 */
export type TabEntity = {
  pk: number;
  name: string;
  templates: TemplateEntity[];
};

export type TemplateEntity = {
  pk: number;
  name: string;
  items: ItemEntity[];
};

export type ItemEntity = {
  pk: number;
  name: string;
};

/**
 * for state mangement & components
 */
export type TabType = Pick<TabEntity, 'name'> & WithComponentsPk;
export type TemplateType = Omit<TemplateEntity, 'pk'> & WithComponentsPk;

export type TabMap = Map<ComponentsPk, TabType>;
export type TemplateMap = Map<ComponentsPk, TemplateType>;

export type TabOrderType = Orders;
export type TemplateOrderType = Map<ComponentsPk, Orders>;
