import { Column } from "@devexpress/dx-react-grid";
import { Table } from "@devexpress/dx-react-grid-material-ui";

class ColumnData {
  static readonly columns: Column[] = [
    { name: "idmaterials", title: "ID" },
    { name: "name", title: "Name" },
    { name: "source", title: "Source" },
    { name: "dataType", title: "Data type" },
    { name: "sourceType", title: "Source type" },
    { name: "dataYear", title: "Data year" },
    { name: "quantity", title: "Quantity" },
    { name: "FU", title: "FU" },
    { name: "EEf_A1A3", title: "EEf_A1A3" },
    { name: "RSL", title: "RSL" },
    { name: "comments", title: "comments" },
    { name: "materialCat", title: "Category" },
    { name: "RSL_mi", title: "RSL (Inventory)" },
    { name: "A1A3", title: "A1-A3" },
    { name: "A4", title: "A4" },
    { name: "B4_m", title: "B4 (m)" },
    { name: "B4_t", title: "B4 (t)" },
    { name: "buildingElementName", title: "Building element" },
  ];

  static readonly columnExtensions: Table.ColumnExtension[] = [
    { columnName: "idmaterials", width: 200, wordWrapEnabled: true },
    { columnName: "name", width: 200, wordWrapEnabled: true },
    { columnName: "source", width: 200, wordWrapEnabled: true },
    { columnName: "dataType", width: 120 },
    { columnName: "sourceType", width: 100 },
    { columnName: "dataYear", width: 100 },
    { columnName: "FU", width: 70 },
    { columnName: "EEf_A1A3", width: 110 },
    { columnName: "RSL", width: 80 },
    { columnName: "comments", width: 400 },
    { columnName: "materialCat", width: 150 },
    { columnName: "quantity", width: 140 },
    { columnName: "RSL_mi", width: 140 },
    { columnName: "A1A3", width: 130 },
    { columnName: "A4", width: 130 },
    { columnName: "B4_m", width: 130 },
    { columnName: "B4_t", width: 130 },
    { columnName: "buildingElementName", width: 200, wordWrapEnabled: true },
  ];

  static readonly defaultHiddenColumnNames: string[] = [
    "source",
    "RSL",
    "dataType",
    "sourceType",
    "dataYear",
    "comments",
  ];

  static readonly tableColumnVisibilityColumnExtensions = [
    { columnName: "name", togglingEnabled: false },
  ];
}

export default ColumnData;
