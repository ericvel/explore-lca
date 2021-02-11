const TABLE_DATA_TYPE = Symbol("data");
const TABLE_TOTAL_SUMMARY_TYPE = Symbol("totalSummary");
const TABLE_GROUP_SUMMARY_TYPE = Symbol("group");

function __read(o: any, n: any) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error: error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

function sliceIterator(arr: any, i: number) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"]) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function slicedToArray(arr: any, i: number) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (Symbol.iterator in Object(arr)) {
    return sliceIterator(arr, i);
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
}

export function isTotalSummaryTableCell(tableRow: any, tableColumn: any) {
  return (
    tableRow.type === TABLE_TOTAL_SUMMARY_TYPE &&
    tableColumn.type === TABLE_DATA_TYPE
  );
}

export function isGroupSummaryTableCell(tableRow: any, tableColumn: any) {
    // console.log("Tablerow: ", tableRow)
    // console.log("Tablecolumntype: ", tableColumn)
    if (tableRow.type === TABLE_GROUP_SUMMARY_TYPE &&
        tableColumn.type === TABLE_DATA_TYPE) {
            console.log("Row: " , tableRow);
            console.log("Column: ", tableColumn);
        }
  return (
    tableRow.type === TABLE_GROUP_SUMMARY_TYPE &&
    tableColumn.type === TABLE_DATA_TYPE
  );
}

export function isTotalSummaryTableRow(tableRow: any) {
  return tableRow.type === TABLE_TOTAL_SUMMARY_TYPE;
}

export function isGroupSummaryTableRow(tableRow: any) {
  return tableRow.type === TABLE_GROUP_SUMMARY_TYPE;
}

export function getColumnSummaries2(
  summaryItems: any[],
  columnName: any,
  summaryValues: any,
  predicate: any
) {
  if (predicate === void 0) {
    predicate = function () {
      return true;
    };
  }
  return summaryItems
    .map(function (item, index) {
      return [item, index];
    })
    .filter(function (_a) {
      var _b = __read(_a, 1),
        item = _b[0];
      return item.columnName === columnName && predicate(item);
    })
    .map(function (_a) {
      var _b = __read(_a, 2),
        item = _b[0],
        index = _b[1];
      return {
        type: item.type,
        value: summaryValues[index],
      };
    });
}

export function getColumnSummaries(
  summaryItems: any[],
  columnName: any,
  summaryValues: any
) {
  return summaryItems
    .map(function (item, index) {
      return [item, index];
    })
    .filter(function (_ref) {
      var _ref2 = slicedToArray(_ref, 1),
        item = _ref2[0];

      return item.columnName === columnName;
    })
    .map(function (_ref3) {
      var _ref4 = slicedToArray(_ref3, 2),
        item = _ref4[0],
        index = _ref4[1];

      return { type: item.type, value: summaryValues[index] };
    });
}
