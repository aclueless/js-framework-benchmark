import { rendr } from '@rendrjs/core';
import { colMd1, colMd4, colMd6 } from './classes';
import { RemoveIcon } from './RemoveIcon';

export let Row = ({ hi, sel, item, del }) => {
  return rendr('tr', {
    class: hi ? 'danger' : undefined,
    slot: [
      rendr('td', {
        class: colMd1,
        slot: `${item.id}`,
      }),
      rendr('td', {
        class: colMd4,
        slot: rendr('a', {
          onclick: () => sel(item.id),
          slot: item.label,
        }),
      }),
      rendr('td', {
        class: colMd1,
        slot: rendr('a', {
          onclick: () => del(item.id),
          slot: rendr(RemoveIcon, {}),
        }),
      }),
      rendr('td', { class: colMd6 }),
    ],
  });
};
