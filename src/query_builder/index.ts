export * from './QueryBuilder';
export * from './QueryBuilderChain';

export interface ColumnConditions {
  [column: string]: string | number | bigint;
}
