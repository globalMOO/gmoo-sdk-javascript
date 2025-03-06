// File: src/enums/objective-type.js
export const ObjectiveType = {
  EXACT: 'exact',
  PERCENT: 'percent',
  VALUE: 'value',
  LESS_THAN: 'lessthan',
  LESS_THAN_EQUAL: 'lessthan_equal',
  GREATER_THAN: 'greaterthan',
  GREATER_THAN_EQUAL: 'greaterthan_equal',
  MINIMIZE: 'minimize',
  MAXIMIZE: 'maximize',

  isPercent(type) {
    return type === this.PERCENT;
  }
};