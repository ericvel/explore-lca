import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";

const DecimalFormatter = ({ value }: any) =>
  value && value > 0.0 ? parseFloat(value).toLocaleString() : "0";

export const DecimalTypeProvider = (props: any) => (
  <DataTypeProvider formatterComponent={DecimalFormatter} {...props} />
);

const BoldFormatter = ({ value }: any) => <b>{value}</b>;

export const BoldTypeProvider = (props: any) => (
  <DataTypeProvider formatterComponent={BoldFormatter} {...props} />
);
