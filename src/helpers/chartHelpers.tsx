
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
export const sortByEE = (chartData: IElementChartDataItem[] | IMaterialChartDataItem[]) => {
    chartData.sort(function (a, b) {
        const aSum = a.A1A3 + a.A4 + a.B4_m + a.B4_t;
        const bSum = b.A1A3 + b.A4 + b.B4_m + b.B4_t;
        return aSum - bSum;
    });

    return chartData;
}

// Groups material inventory by material type, sums material inventory embodied emission values
export const groupByMaterial = (materials: IMaterialInventory[]) => {
    const materialsGrouped: IMaterialChartDataItem[] = [];

    materials.reduce(function (res: any, value: IMaterialInventory) {
        if (!res[value.name]) {
            res[value.name] = { name: value.name, A1A3: 0.0, A4: 0.0, B4_m: 0.0, B4_t: 0.0 };
            materialsGrouped.push(res[value.name])
        }
        res[value.name].A1A3 += value.A1A3;
        res[value.name].A4 += value.A4;
        res[value.name].B4_m += value.B4_m;
        res[value.name].B4_t += value.B4_t;
        return res;
    }, {});

    return materialsGrouped;
}