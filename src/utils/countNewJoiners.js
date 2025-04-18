const countNewJoiners = (nodes) => {
  if (!nodes || nodes.length === 0) return 0;
  const firstObjectChildren = nodes[0]?.children || [];
  return firstObjectChildren.reduce(
    (total, child) => total + (child.newJoiners || 0),
    0
  );
};
export default countNewJoiners;
