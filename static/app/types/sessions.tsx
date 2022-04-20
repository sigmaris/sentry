import {AggregationOutputType, ColumnType} from 'sentry/utils/discover/fields';

export type SessionsMeta = {
  name: string;
  operations: SessionsOperation[];
  type: ColumnType;
};

export enum SessionMetric {
  SESSION = 'session',
  SESSION_DURATION = 'session.duration',
  USER = 'user',
  SESSION_ALL = 'session.all',
  SESSION_HEALTHY = 'session.healthy',
  SESSION_ERRORED = 'session.errored',
  SESSION_ABNORMAL = 'session.abnormal',
  SESSION_CRASHED = 'session.crashed',
}

export type SessionsOperation =
  | 'sum'
  | 'count_unique'
  | 'avg'
  | 'max'
  | 'p50'
  | 'p75'
  | 'p95'
  | 'p99';

export type SessionAggregationColumn = {
  columnTypes: string[];
  defaultValue: SessionsMeta['name'];
  outputType: AggregationOutputType | null;
};
