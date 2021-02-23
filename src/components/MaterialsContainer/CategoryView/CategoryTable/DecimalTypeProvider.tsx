import React from "react";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import Input from "@material-ui/core/Input";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    numericInput: {
      textAlign: "right",
      width: "100%",
    },
  })
);

const DecimalFormatter = ({ value }: any) =>
  value && value > 0.0 ? parseFloat(value).toFixed(3) : (0.0).toFixed(1);

const getInputValue = (value: any) => (value === undefined ? 0.000 : parseFloat(value).toFixed(3));

const DecimalEditor = ({ value, onValueChange }: any) => {
  const handleChange = (event: any) => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === "") {
      onValueChange();
      return;
    }
    onValueChange(Number(targetValue));
  };
  return (
    <Input
      type='number'
      classes={{
        input: useStyles().numericInput,
      }}
      fullWidth
      value={getInputValue(value)}
      inputProps={{
        step: 0.1,
        min: 0,
        placeholder: "Enter value...",
      }}
      onChange={handleChange}
    />
  );
};

export const DecimalTypeProvider = (props: any) => (
  <DataTypeProvider
    formatterComponent={DecimalFormatter}
    editorComponent={DecimalEditor}
    {...props}
  />
);
