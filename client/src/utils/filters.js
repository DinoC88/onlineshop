const brand = [
  { _id: 0, name: "Apple" },
  { _id: 1, name: "Samsung" },
  { _id: 2, name: "Huawei" },
  { _id: 3, name: "LG" },
  { _id: 4, name: "HTC" }
];

const ram = [
  {
    _id: 0,
    name: "1 GB"
  },
  {
    _id: 1,
    name: "3 GB"
  },
  {
    _id: 2,
    name: "4 GB"
  },
  {
    _id: 3,
    name: "6 GB"
  }
];

const price = [
  { _id: 0, name: "Any", array: [] },
  {
    _id: 1,
    name: "<$249",
    array: [0, 249]
  },
  {
    _id: 2,
    name: "$250-$499",
    array: [250, 499]
  },
  {
    _id: 3,
    name: "$500-$749",
    array: [500, 749]
  },
  {
    _id: 4,
    name: "$750>",
    array: [750, 500000]
  }
];

const color = [
  {
    _id: 0,
    name: "White"
  },
  {
    _id: 1,
    name: "Black"
  },
  {
    _id: 2,
    name: "Gray"
  },
  {
    _id: 3,
    name: "Blue"
  }
];

const internalMemory = [
  {
    _id: 0,
    name: "16 GB"
  },
  {
    _id: 1,
    name: "64 GB"
  },
  {
    _id: 2,
    name: "128 GB"
  },
  {
    _id: 3,
    name: "256 GB"
  }
];

const displaySize = [
  {
    _id: 0,
    name: '4.5"'
  },
  {
    _id: 1,
    name: '5.1"'
  },
  {
    _id: 2,
    name: '5.5"'
  },
  {
    _id: 3,
    name: '5.8"'
  },
  {
    _id: 4,
    name: '6.0"'
  },
  {
    _id: 5,
    name: '6.3"'
  }
];

const displayResolution = [
  {
    _id: 0,
    name: "540 x 960"
  },
  {
    _id: 1,
    name: "1080 x 1920"
  },
  {
    _id: 2,
    name: "1125 x 2436"
  },
  {
    _id: 3,
    name: "1440 x 2560"
  },
  {
    _id: 4,
    name: "1440 x 2880"
  },
  {
    _id: 5,
    name: "1440 x 2960"
  }
];
export {
  brand,
  ram,
  price,
  color,
  internalMemory,
  displaySize,
  displayResolution
};
