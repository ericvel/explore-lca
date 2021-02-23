// Wraps label over two lines if longer than 15 characters
export const wrapArgumentAxisLabel = (data: any) => {
  if (data.value.length > 15) {
    const wordArray: string[] = data.value.split(" ");
    if (wordArray.length > 2) {
      const breakPoint = Math.ceil(wordArray.length / 2);
      const firstLine = wordArray.slice(0, breakPoint).join(" ");
      const secondLine = wordArray.slice(breakPoint).join(" ");
      return firstLine + "\n" + secondLine;
    } else {
      return wordArray.join("\n");
    }
  }

  return data.value;
};

// Sorts chart data by the sum of each item's embodied emission values
export const sortByEE = (chartData: IChartDataItem[]) => {
  chartData.sort(function (a: IChartDataItem, b: IChartDataItem) {
    const aSum = a.A1A3 + a.A4 + a.B4_m + a.B4_t;
    const bSum = b.A1A3 + b.A4 + b.B4_m + b.B4_t;
    return aSum - bSum;
  });

  return chartData;
};

// Groups material inventory by material type, sums material inventory embodied emission values
export const groupByMaterial = (materials: IMaterialInventory[]) => {
  const materialsGrouped: IChartDataItem[] = [];

  materials.reduce(function (res: any, value: IMaterialInventory) {
    if (!res[value.name]) {
      res[value.name] = {
        name: value.name,
        A1A3: 0.0,
        A4: 0.0,
        B4_m: 0.0,
        B4_t: 0.0,
        materialCat: value.materialCat,
      };
      materialsGrouped.push(res[value.name]);
    }
    res[value.name].A1A3 += value.A1A3;
    res[value.name].A4 += value.A4;
    res[value.name].B4_m += value.B4_m;
    res[value.name].B4_t += value.B4_t;
    return res;
  }, {});

  return materialsGrouped;
};

// Group material inventory by material category, sum material inventory embodied emission values
export const groupByCategory = (materials: IMaterialInventory[]) => {
  const materialsGrouped: IChartDataItem[] = [];

  materials.reduce(function (res: any, value: IMaterialInventory) {
    if (!res[value.materialCat]) {
      res[value.materialCat] = {
        materialCat: value.materialCat,
        A1A3: 0.0,
        A4: 0.0,
        B4_m: 0.0,
        B4_t: 0.0,
      };
      materialsGrouped.push(res[value.materialCat]);
    }
    res[value.materialCat].A1A3 += value.A1A3;
    res[value.materialCat].A4 += value.A4;
    res[value.materialCat].B4_m += value.B4_m;
    res[value.materialCat].B4_t += value.B4_t;
    return res;
  }, {});

  return materialsGrouped;
};

export const getElementMaterials = (materialInventory: IMaterialInventory[], parentElement: IBuildingElement) => {
  const elementMaterials = materialInventory.filter(
    (material) =>
      material.idbuilding_elements === parentElement.idbuilding_elements
  );
  if (elementMaterials !== undefined) {
    return elementMaterials;
  }

  return [];
};

// Groups material inventory by material type, sums material inventory embodied emission values
export const groupByMaterial2 = (materials: IMaterialInventory[]) => {
  const materialsGrouped: any[] = [];

  materials.reduce(function (res: any, value: IMaterialInventory) {
    if (!res[value.name]) {
      res[value.name] = {
        ...value,
        name: value.name,
        idmaterialInventory: value.idmaterials,
        quantity: 0.0,
        A1A3: 0.0,
        A4: 0.0,
        B4_m: 0.0,
        B4_t: 0.0,
        idmaterials: null,
      };
      materialsGrouped.push(res[value.name]);
    }

    res[value.name].quantity += value.quantity;
    res[value.name].A1A3 += value.A1A3;
    res[value.name].A4 += value.A4;
    res[value.name].B4_m += value.B4_m;
    res[value.name].B4_t += value.B4_t;
    return res;
  }, {});

  return materialsGrouped;
};