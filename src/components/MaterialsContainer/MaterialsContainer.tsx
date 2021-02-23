import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";
import { getSimulationFromDb } from "services/firebase";

import ReactDOM from "react-dom";
import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  emphasize,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import Tooltip from "@material-ui/core/Tooltip";
import Skeleton from "@material-ui/lab/Skeleton";

import BuildingElementsView from "./BuildingElementsView";
import ProductView from "./ProductView";
import CategoryView from "./CategoryView";
import { GroupBy } from "interfaces/enums";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginRight: theme.spacing(2),
      minWidth: 180,
    },
  })
);

const MaterialsContainer = (props: any) => {
  const dispatch = useDispatch();
  const selectedBuildings = useSelector(
    (state: IRootState) => state.selectedBuildings
  );
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );
  const groupBy = useSelector((state: IRootState) => state.materialsGroupBy);
  const displayMode = useSelector((state: IRootState) => state.displayMode);

  const [loading, setLoading] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(
      allActions.uiActions.setMaterialsGroupBy(event.target.value as string)
    );
  };

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(allActions.uiActions.setDisplayMode(event.target.value as string));
  };

  const handleTooltip = (isOpen: boolean) => {
    setTooltipOpen(isOpen);
  };

  useEffect(() => {
    if (selectedBuildings.length) {
      loadData();
    }
  }, [selectedBuildings]);

  const loadData = () => {
    const buildingId = selectedBuildings[0].idbuildings;

    const elementQuery = `/building_elements/${buildingId}`;
    const inventoryQuery = `/material_inventory/${buildingId}`;

    if (!loading) {
      setLoading(true);
      Promise.all([fetch(elementQuery), fetch(inventoryQuery)])
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((data) => {
          getSimulationFromDb(String(buildingId))
            .then((doc) => {
              let simulationData: ISimulationData[] = [];
              if (doc.exists) {
                for (let [key, value] of Object.entries(doc.data()!)) {
                  simulationData.push({
                    inventoryId: Number(key),
                    simulatedFields: value,
                  });
                }
                console.log("Simulation data: ", simulationData);
              }

              ReactDOM.unstable_batchedUpdates(() => {
                dispatch(
                  allActions.elementAndMaterialActions.setBuildingElements(
                    data[0]
                  )
                );
                dispatch(
                  allActions.elementAndMaterialActions.setMaterialInventory(
                    data[1]
                  )
                );
                dispatch(
                  allActions.elementAndMaterialActions.setSimulationData(
                    simulationData
                  )
                );
                setLoading(false);
              });
            })
            .catch((error) => {
              console.log("Error getting simulation data:", error);
              setLoading(false);
            });
        })
        .catch(() => setLoading(false));
    }
    getSimulationFromDb(String(buildingId));
  };

  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} alignItems='center' justify='space-between'>
        <Grid item>
          <Typography variant='h5' color='textSecondary' gutterBottom>
            Materials
          </Typography>
        </Grid>
        <Grid item>
          <Tooltip title='Select what to display' open={tooltipOpen}>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel id='demo-simple-select-outlined-label'>
                Group by
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                displayEmpty
                value={groupBy}
                label='Group by'
                onChange={handleSelectChange}
                onMouseEnter={() => handleTooltip(true)}
                onMouseLeave={() => handleTooltip(false)}
                onOpen={() => handleTooltip(false)}
              >
                <MenuItem value={GroupBy.BuildingElement}>
                  Building element
                </MenuItem>
                <MenuItem value={GroupBy.Product}>Product</MenuItem>
                <MenuItem value={GroupBy.Category}>Category</MenuItem>
              </Select>
            </FormControl>
          </Tooltip>
          <FormControl component='fieldset'>
            <FormLabel component='legend' color='secondary'>
              Display mode
            </FormLabel>
            <RadioGroup
              value={displayMode}
              onChange={handleRadioButtonChange}
              row
            >
              <FormControlLabel
                value='table'
                control={<Radio />}
                label='Table'
              />
              <FormControlLabel
                value='chart'
                control={<Radio />}
                label='Chart'
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      {loading || props.parentIsLoading ? (
        <div>
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
        </div>
      ) : groupBy === GroupBy.BuildingElement ? (
        <BuildingElementsView />
      ) : groupBy === GroupBy.Product ? (
        <ProductView materials={materialInventory} />
      ) : (
        <CategoryView materials={materialInventory} />
      )}
    </div>
  );
};

export default MaterialsContainer;
