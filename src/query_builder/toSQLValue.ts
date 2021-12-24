export default function toSQLValue(value: any) {
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'undefined') return 'NULL';
  return value;
}
