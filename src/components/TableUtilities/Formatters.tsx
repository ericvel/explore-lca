import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { LCAPhaseTooltip } from "interfaces/enums";
import { TableHeaderRow } from "@devexpress/dx-react-grid-material-ui";

const DecimalFormatter = ({ value }: any) =>
  value && value > 0.0 ? parseFloat(value).toLocaleString() : "0";

export const DecimalTypeProvider = (props: any) => (
  <DataTypeProvider formatterComponent={DecimalFormatter} {...props} />
);

const BoldFormatter = ({ value }: any) => <b>{value}</b>;

export const BoldTypeProvider = (props: any) => (
  <DataTypeProvider formatterComponent={BoldFormatter} {...props} />
);

export const SortLabel = ({ getMessage, column, ...restProps }: any) => {
  var message: string = "";
  switch (column.name) {
    case "A1A3":
      message = LCAPhaseTooltip.A1A3;
      break;
    case "A4":
      message = LCAPhaseTooltip.A4;
      break;
    case "B4":
      message = LCAPhaseTooltip.B4;
      break;
    case "B4_m":
      message = LCAPhaseTooltip.B4m;
      break;
    case "B4_t":
      message = LCAPhaseTooltip.B4t;
      break;
    case "GWP_B6":
      message = LCAPhaseTooltip.B6;
      break;
    case "GWP_B7":
      message = LCAPhaseTooltip.B7;
      break;
    case "FU":
      message = "Functional unit";
      break;
    default:
      message = `Sort by ${column.name}`;
      break;
  }
  return (
    <TableHeaderRow.SortLabel
      column={column}
      getMessage={() => {
        return message;
      }}
      {...restProps}
    />
  );
};