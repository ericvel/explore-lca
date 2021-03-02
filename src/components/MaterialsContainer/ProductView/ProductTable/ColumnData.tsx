import { Column, EditingState } from "@devexpress/dx-react-grid";
import { Table } from "@devexpress/dx-react-grid-material-ui";

class ColumnData {
  static readonly columns: Column[] = [
    { name: "name", title: "Name" },
    // { name: "idmaterialInventory", title: "ID" },
    { name: "buildingElementName", title: "Building element" },
    { name: "quantity", title: "Quantity" },
    { name: "FU", title: "FU" },
    { name: "materialCat", title: "Category" },
    { name: "sourceType", title: "Source type" },
    { name: "RSL_mi", title: "RSL (Inventory)" },
    { name: "A1A3", title: "A1-A3" },
    { name: "A4", title: "A4" },
    { name: "B4_m", title: "B4 (m)" },
    { name: "B4_t", title: "B4 (t)" },
    { name: "RSL", title: "RSL" },
    { name: "source", title: "Source" },
    { name: "dataType", title: "Data type" },
    { name: "dataYear", title: "Data year" },
    { name: "density", title: "Density" },
    { name: "EEf_A1A3", title: "EEf_A1A3" },
    { name: "country", title: "Country" },
    { name: "city", title: "City" },
    { name: "comments", title: "Comments" },
  ];

  static readonly columnExtensions: Table.ColumnExtension[] = [
    { columnName: "idmaterialInventory", width: 80 },
    { columnName: "name", width: 270, wordWrapEnabled: true },
    { columnName: "dataType", width: 120 },
    { columnName: "sourceType", width: 120 },
    { columnName: "source", width: 200, wordWrapEnabled: true },
    { columnName: "dataYear", width: 100 },
    { columnName: "FU", width: 70 },
    { columnName: "EEf_A1A3", width: 110 },
    { columnName: "RSL", width: 80 },
    { columnName: "comments", width: 400 },
    { columnName: "materialCat", width: 150 },
    { columnName: "quantity", width: 130 },
    { columnName: "RSL_mi", width: 140 },
    { columnName: "A1A3", width: 130 },
    { columnName: "A4", width: 130 },
    { columnName: "B4_m", width: 130 },
    { columnName: "B4_t", width: 130 },
    { columnName: "buildingElementName", width: 160, wordWrapEnabled: true },
  ];

  static readonly defaultHiddenColumnNames: string[] = [
    "source",
    "RSL",
    "dataType",
    "dataYear",
    "comments",
    "EEf_A1A3",
    "density",
    "country",
    "city",
  ];

  static readonly tableColumnVisibilityColumnExtensions = [
    { columnName: "name", togglingEnabled: false },
  ];

  static readonly decimalColumns = [
    "quantity",
    "EEf_A1A3",
    "A1A3",
    "A4",
    "B4_t",
    "B4_m",
  ];

  static readonly groupSummaryItems = [
    {
      columnName: "quantity",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "FU",
      type: "staticValue",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "sourceType",
      type: "staticValue",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "materialCat",
      type: "staticValue",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "RSL_mi",
      type: "avg",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "A1A3",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "A4",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "B4_m",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
    {
      columnName: "B4_t",
      type: "sum",
      showInGroupFooter: false,
      alignByColumn: true,
    },
  ];

  static readonly editingStateColumnExtensions: EditingState.ColumnExtension[] = [
    { columnName: "idmaterialInventory", editingEnabled: false },
    { columnName: "name", editingEnabled: false },
    { columnName: "buildingElementName", editingEnabled: false },
    // { columnName: "quantity", editingEnabled: false},
    { columnName: "FU", editingEnabled: false },
    // { columnName: "sourceType", editingEnabled: false},
    { columnName: "RSL", editingEnabled: false },
    { columnName: "materialCat", editingEnabled: false },
    { columnName: "RSL_mi", editingEnabled: false },
    // { columnName: "EEf_A1A3", editingEnabled: false},
    // { columnName: "A1A3", editingEnabled: false},
    // { columnName: "A4", editingEnabled: false},
    // { columnName: "B4_m", editingEnabled: false},
    // { columnName: "B4_t", editingEnabled: false},
    { columnName: "dataType", editingEnabled: false },
    { columnName: "dataYear", editingEnabled: false },
    { columnName: "comments", editingEnabled: false },
  ];
}

export default ColumnData;
