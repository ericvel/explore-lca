import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";
import { getSimulatedDataFromDb } from "services/firebase";

import ReactDOM from "react-dom";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
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
import {
  groupByMaterial,
  mergeSimulatedDataIntoMaterialProducts,
} from "helpers/materialHelpers";

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
  const isSimulationModeActive = useSelector(
    (state: IRootState) => state.isSimulationModeActive
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
          getSimulatedDataFromDb(String(buildingId))
            .then((doc) => {
              let simulatedData: ISimulatedData = {};
              if (doc.exists) {
                simulatedData = doc.data() ?? {};
              }

              const buildingElements = data[0];
              const materialInventory = data[1];
              const materialProducts = groupByMaterial(materialInventory);
              const simulatedMaterialProducts = mergeSimulatedDataIntoMaterialProducts(
                materialProducts as IMaterialTableRow[],
                simulatedData
              );

              ReactDOM.unstable_batchedUpdates(() => {
                dispatch(
                  allActions.elementAndMaterialActions.setBuildingElements(
                    buildingElements
                  )
                );
                dispatch(
                  allActions.elementAndMaterialActions.setMaterialInventory(
                    materialInventory
                  )
                );
                dispatch(
                  allActions.elementAndMaterialActions.setMaterialProducts(
                    materialProducts
                  )
                );
                dispatch(
                  allActions.elementAndMaterialActions.setSimulatedData(
                    simulatedData
                  )
                );
                dispatch(
                  allActions.elementAndMaterialActions.setSimulatedMaterialProducts(
                    simulatedMaterialProducts
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
    getSimulatedDataFromDb(String(buildingId));
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
          <Tooltip
            title='Disable simulation mode to select different grouping'
            // open={tooltipOpen}
            disableFocusListener={!isSimulationModeActive}
            disableHoverListener={!isSimulationModeActive}
            disableTouchListener={!isSimulationModeActive}
          >
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel>Group by</InputLabel>
              <Select
                displayEmpty
                value={groupBy}
                label='Group by'
                onChange={handleSelectChange}
                onMouseEnter={() => handleTooltip(true)}
                onMouseLeave={() => handleTooltip(false)}
                onOpen={() => handleTooltip(false)}
              >
                <MenuItem
                  value={GroupBy.BuildingElement}
                  disabled={isSimulationModeActive}
                >
                  Building element
                </MenuItem>
                <MenuItem value={GroupBy.Product}>Product</MenuItem>
                <MenuItem
                  value={GroupBy.Category}
                  disabled={isSimulationModeActive}
                >
                  Category
                </MenuItem>
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
        <Skeleton style={{ marginTop: "65px" }} variant='rect' height={350} />
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
