/*
COMMON FUNCTIONS
*/

export const getChildElements = (
  buildingElements: IBuildingElement[],
  parentElement: IBuildingElement
) => {
  const childElements = buildingElements.filter(
    (element) => element.idparent === parentElement.idlevels
  );
  if (childElements !== undefined) {
    return childElements;
  }

  return [];
};

// Get materials associated with a building element
export const getElementMaterials = (
  materialInventory: IMaterialInventory[],
  parentElement: IBuildingElement
) => {
  const elementMaterials = materialInventory.filter(
    (material) =>
      material.idbuilding_elements === parentElement.idbuilding_elements
  );
  if (elementMaterials !== undefined) {
    return elementMaterials;
  }

  return [];
};

/* 
CHART FUNCTIONS
*/

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
export const sortByEE = (
  chartData: IMaterialChartItem[] | IElementChartItem[]
) => {
  chartData.sort(function (a: any, b: any) {
    const aSum = a.A1A3 + a.A4 + a.B4_m + a.B4_t;
    const bSum = b.A1A3 + b.A4 + b.B4_m + b.B4_t;
    return aSum - bSum;
  });

  return chartData;
};

// Group material inventory by material type, sum material inventory embodied emission values
export const createMaterialChartData = (
  materials: IMaterialTableParentRow[]
) => {
  // Only keep certain attributes from MaterialTableRow
  const chartData: IMaterialChartItem[] = materials.map(
    ({
      idmaterials,
      sourceType,
      RSL_mi,
      source,
      dataType,
      dataYear,
      density,
      EEf_A1A3,
      RSL,
      comments,
      parentId,
      ...keepAttrs
    }) => keepAttrs
  );

  return chartData;
};

// Group material inventory by material category, sum material inventory embodied emission values
export const groupByCategory = (materials: IMaterialChartItem[]) => {
  const materialsGrouped: IMaterialChartItem[] = [];

  materials.reduce(function (res: any, value: IMaterialChartItem) {
    if (!res[value.materialCat]) {
      res[value.materialCat] = {
        name: value.materialCat,
        A1A3: 0.0,
        A4: 0.0,
        B4_m: 0.0,
        B4_t: 0.0,
        materialCat: "",
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

/*
TABLE FUNCTIONS
*/

// Group material inventory by material type, sum material inventory embodied emission values
export const groupByMaterial = (materials: IMaterialInventory[]) => {
  const materialsGrouped: IMaterialTableParentRow[] = [];

  materials.reduce(function (res: any, value: IMaterialInventory) {
    if (!res[value.name]) {
      res[value.name] = {
        ...value,
        idmaterialInventory: value.parentId,
        quantity: 0.0,
        A1A3: 0.0,
        A4: 0.0,
        B4_m: 0.0,
        B4_t: 0.0,
        parentId: null,
        buildingElementName: value.buildingElementName,
      };
      materialsGrouped.push(res[value.name]);
    }

    res[value.name].quantity += value.quantity;
    res[value.name].A1A3 += value.A1A3;
    res[value.name].A4 += value.A4;
    res[value.name].B4_m += value.B4_m;
    res[value.name].B4_t += value.B4_t;

    // Display ellipses if materials in group don't share the same building element
    if (res[value.name].buildingElementName !== value.buildingElementName) {
      res[value.name].buildingElementName = "...";
    }
    return res;
  }, {});

  return materialsGrouped;
};

// Rows containing the individual material inventory entries
export const createChildRows = (materials: IMaterialInventory[]) => {
  const childRows: IMaterialTableChildRow[] = materials.map((m) => ({
    idmaterialInventory: m.idmaterialInventory,
    name: "Inventory: " + String(m.idmaterialInventory),
    buildingElementName: m.buildingElementName,
    quantity: m.quantity,
    FU: m.FU,
    A1A3: m.A1A3 || 0.0,
    A4: m.A4 || 0.0,
    B4_m: m.B4_m || 0.0,
    B4_t: m.B4_t || 0.0,
    RSL_mi: m.RSL_mi,
    parentId: m.parentId,
  }));

  return childRows;
};

/*
SIMULATION MODE
*/

export const mergeSimulatedDataIntoMaterialProducts = (
  materialRows: IMaterialTableRow[],
  simulatedData: ISimulatedData
) => {
  let changedRows: IMaterialTableRow[] = [];
  if (simulatedData) {
    changedRows = materialRows.map((row) =>
      simulatedData[row.idmaterialInventory]
        ? { ...row, ...simulatedData[row.idmaterialInventory] }
        : row
    );
  }

  return changedRows;
};
