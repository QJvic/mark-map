export function removeListItem(list, item) {
  if (item instanceof Object)
    for (let i = 0; i < list.length; i++) {
      if (Object.keys(item).every(key => item[key] === list[i][key])) {
        list.splice(i, 1);
        return list;
      }
    }
  else
    for (let i = 0; i < list.length; i++) {
      if (list[i] === item) {
        list.splice(i, 1);
        return list;
      }
    }
}
