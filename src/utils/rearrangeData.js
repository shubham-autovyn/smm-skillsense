const RearrangeData = (data) => {
  if (!data || !Array.isArray(data)) return [];

  // Swap first two elements if their categories match the condition
  if (
    data.length >= 2 &&
    data[0]?.category === "Offline" &&
    data[1]?.category === "Online"
  ) {
    [data[0], data[1]] = [data[1], data[0]];
  }
  if (
    data.length >= 1 &&
    data[0]?.children?.length >= 2 &&
    data[0]?.children[0]?.name === "offline" &&
    data[0]?.children[1]?.name === "online"
  ) {
    [data[0].children[0], data[0].children[1]] = [
      data[0].children[1],
      data[0].children[0],
    ];
  }

  return data.map((item) => {
    if (item?.child && item.child.length > 0) {
      item.child = RearrangeData(item.child); // Recurse into children

      // Swap child elements if their categories match the condition
      if (
        item.child.length >= 2 &&
        item.child[0].category === "offline" &&
        item.child[1].category === "online"
      ) {
        [item.child[0], item.child[1]] = [item.child[1], item.child[0]];
      }
    }
    return item;
  });
};

export default RearrangeData;
