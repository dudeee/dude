/**
 * Takes a comparing string in format of '>=?|<=? num' and compares
 * the value with format
 * @param  {String} format example:
 *                         >= 0.2
 *                         < 6
 *                         > 2, < 5
 * @param  {Number} value
 * @return {Boolean}
 */
export function compare(format, value) {
  const GREATER_THAN = />=?\s?((?:-|\d|\.)+)/;
  const LESS_THAN = /<=?\s?((?:-|\d|\.)+)/;

  let fmt = { gt: -Infinity, lt: Infinity, lte: Infinity, gte: -Infinity };

  let gt = GREATER_THAN.exec(format);
  let lt = LESS_THAN.exec(format);

  if (gt && gt[0].includes('=')) {
    fmt.gte = +gt[1];
  } else if (gt) {
    fmt.gt = +gt[1];
  }

  if (lt && lt[0].includes('=')) {
    fmt.lte = +lt[1];
  } else if (lt) {
    fmt.lt = +lt[1];
  }

  return value > fmt.gt && value < fmt.lt &&
         value >= fmt.gte && value <= fmt.lte;
}

export const numbers = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:', ':ten:'];
