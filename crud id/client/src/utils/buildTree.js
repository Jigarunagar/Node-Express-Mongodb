export function buildTree(items) {
  const map = {};
  const roots = [];
  items.forEach(item => {
    map[item._id] = { ...item, children: [] };
  });
  items.forEach(item => {
    if (item.parent) {
      map[item.parent].children.push(map[item._id]);
    } else {
      roots.push(map[item._id]);
    }
  });
  return roots;
}
