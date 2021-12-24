import { ColumnConditions } from '../query_builder';

export * from './Model';
export interface SearchOptions {
  table?: string;
  where: ColumnConditions | ColumnConditions[];
}
