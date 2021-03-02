import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  emphasize,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Tooltip from "@material-ui/core/Tooltip";

import ElementsTable from "./ElementsTable";
import ElementsChart from "./ElementsChart";
import ProductView from "../ProductView";

import { getChildElements, getElementMaterials } from "helpers/materialHelpers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    breadCrumbs: {
      marginTop: "3px",
    },
  })
);

const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

const StyledBreadcrumbActive = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    height: theme.spacing(3),
    // color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      // backgroundColor: theme.palette.grey[300],
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      // backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip) as typeof Chip;

const BuildingElementsView = (props: any) => {
  const dispatch = useDispatch();
  const buildingElements = useSelector(
    (state: IRootState) => state.buildingElements
  );
  const materialInventory = useSelector(
    (state: IRootState) => state.materialInventory
  );
  const selectedBuildingElement = useSelector(
    (state: IRootState) => state.selectedBuildingElement
  );
  const elementRoute = useSelector(
    (state: IRootState) => state.buildingElementRoute
  );
  const displayMode = useSelector((state: IRootState) => state.displayMode);

  useEffect(() => {
    const rootElement = buildingElements.find(
      (element: IBuildingElement) => element.hierarchy === 0
    );
    if (rootElement !== undefined) {
      dispatch(
        allActions.elementAndMaterialActions.selectBuildingElement(rootElement)
      );
      dispatch(
        allActions.elementAndMaterialActions.setElementRoute([rootElement])
      );
    }
  }, []);

  const handleBreadcrumbClick = (index: number) => {
    var tempRoute = elementRoute.slice(0, index + 1);
    dispatch(
      allActions.elementAndMaterialActions.selectBuildingElement(
        tempRoute[tempRoute.length - 1]
      )
    );
    dispatch(allActions.elementAndMaterialActions.setElementRoute(tempRoute));
  };

  const [poppedRouteItem, setPoppedRouteItem] = useState<IBuildingElement>();

  const navigateBack = () => {
    var tempRoute = elementRoute;
    setPoppedRouteItem(tempRoute.pop());
    dispatch(
      allActions.elementAndMaterialActions.selectBuildingElement(
        tempRoute[tempRoute.length - 1]
      )
    );
    dispatch(allActions.elementAndMaterialActions.setElementRoute(tempRoute));
  };

  const navigateForward = () => {
    var tempRoute = elementRoute;
    if (poppedRouteItem !== undefined) tempRoute.push(poppedRouteItem);
    dispatch(
      allActions.elementAndMaterialActions.selectBuildingElement(
        tempRoute[tempRoute.length - 1]
      )
    );
    dispatch(allActions.elementAndMaterialActions.setElementRoute(tempRoute));
  };

  const childElements = getChildElements(
    buildingElements,
    selectedBuildingElement
  );

  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} alignItems='center'>
        <Grid item>
          <Tooltip title='Back'>
            <IconButton
              size='small'
              onClick={navigateBack}
              disabled={elementRoute.length < 2}
            >
              <NavigateBeforeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Forward'>
            <IconButton size='small' onClick={navigateForward} disabled={true}>
              <NavigateNextIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <Breadcrumbs>
            {elementRoute.map((element, index) =>
              index !== elementRoute.length - 1 ? (
                <StyledBreadcrumb
                  className={classes.breadCrumbs}
                  key={index}
                  label={element.name}
                  variant='default'
                  icon={
                    element.idlevels === 0 ? (
                      <HomeIcon fontSize='small' />
                    ) : undefined
                  }
                  color={
                    index === elementRoute.length - 1 ? "secondary" : "default"
                  }
                  onClick={() => handleBreadcrumbClick(index)}
                />
              ) : (
                <StyledBreadcrumbActive
                  className={classes.breadCrumbs}
                  key={index}
                  label={element.name}
                  variant='default'
                  icon={
                    element.idlevels === 0 ? (
                      <HomeIcon fontSize='small' />
                    ) : undefined
                  }
                  color='secondary'
                />
              )
            )}
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12}>
          {childElements?.length ? (
            displayMode == "table" ? (
              <Paper>
                <ElementsTable />
              </Paper>
            ) : (
              <Paper>
                <ElementsChart />
              </Paper>
            )
          ) : (
            <ProductView
              materials={getElementMaterials(
                materialInventory,
                selectedBuildingElement
              )}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default BuildingElementsView;
