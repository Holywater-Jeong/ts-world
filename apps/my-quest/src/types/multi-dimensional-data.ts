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
export type TemplateType = Pick<TemplateEntity, 'name'> & WithComponentsPk;
export type ItemType = Pick<ItemEntity, 'name'> & WithComponentsPk;

export type TabMap = Map<ComponentsPk, TabType>;
export type TemplateMap = Map<ComponentsPk, TemplateType>;
export type ItemMap = Map<ComponentsPk, ItemType>;

export type TabOrderType = Orders;
export type TemplateOrderType = Map<
  ComponentsPk, // Tab's PK
  Orders
>;
export type ItemOrderType = Map<
  ComponentsPk, // Template's PK
  Orders
>;
