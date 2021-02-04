import React, { useState, useEffect } from "react";
import {
  createStyles,
  useTheme,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from "@material-ui/core/styles";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Skeleton from "@material-ui/lab/Skeleton";
import IconButton from "@material-ui/core/IconButton";
import "./BuildingInfoDrawer.css";
import ReactDOM from "react-dom";
import BuildingElementsView from "../../ElementsAndMaterialsContainer/BuildingElementsView";

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    buildingSection: {
      marginBottom: theme.spacing(2),
    },
    divider: {
      marginBottom: theme.spacing(2),
    },
    elementSection: {
      marginTop: theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  })
);

const initialBuildingState: IBuilding = {
  idbuildings: 0,
  building_identifier: "",
  building_name: "",
  project: "",
  country: "",
  city: "",
  lifetime: 0,
  typology: "",
  construction_type: "",
  floor_area: 0,
  A1A3: null,
  A4: null,
  B4_m: null,
  B4_t: null,
};

const BuildingInfoDrawer = (props: any) => {
  // const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [building, setBuilding] = useState<IBuilding>(initialBuildingState);

  useEffect(() => {
    if (props.selectedBuildingId !== undefined) {
      loadData();
      handleDrawerOpen();
    } else {
      handleDrawerClose();
    }
  }, [props.selectedBuildingId]);

  const loadData = () => {
    const buildingQuery = `/buildings/${props.selectedBuildingId}`;
    if (!loading) {
      setLoading(true);
      fetch(buildingQuery)
        .then((response) => response.json())
        .then((data) => {
          setBuilding(data[0]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  const {
    building_identifier,
    building_name,
    country,
    city,
    typology,
    construction_type,
    A1A3,
    A4,
    B4_m,
    B4_t,
  } = building;

  // const classes = useStyles();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Grid container spacing={3} className={classes.buildingSection}>
            <Grid item xs={11}>
              <Typography variant="h4" color="textPrimary">
                {loading ? <Skeleton /> : building_name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                {loading ? <Skeleton width={70} /> : building_identifier}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                General info
              </Typography>
              {loading ? (
                <div>
                  <Skeleton>
                    <TextField label="a" margin="dense" />
                  </Skeleton>
                  <Skeleton>
                    <TextField label="a" margin="dense" />
                  </Skeleton>
                  <Skeleton>
                    <TextField label="a" margin="dense" />
                  </Skeleton>
                  <Skeleton>
                    <TextField label="a" margin="dense" />
                  </Skeleton>
                </div>
              ) : (
                <div>
                  <TextField
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth={true}
                    label="Country"
                    name="country"
                    margin="dense"
                    defaultValue={country || "nil"}
                  />
                  <TextField
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth={true}
                    label="City"
                    name="city"
                    margin="dense"
                    defaultValue={city || "nil"}
                  />
                  <TextField
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth={true}
                    label="Typology"
                    name="typology"
                    margin="dense"
                    defaultValue={typology || "nil"}
                  />
                  <TextField
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth={true}
                    label="Construction type"
                    name="construction_type"
                    margin="dense"
                    defaultValue={construction_type || "nil"}
                  />
                </div>
              )}
            </Grid>
            <Grid item xs>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                GWP
              </Typography>
              {loading ? (
                <div>
                  <Skeleton>
                    <TextField label="a" margin="dense" />
                  </Skeleton>
                  <Skeleton>
                    <TextField label="a" margin="dense" />
                  </Skeleton>
                  <Skeleton>
                    <TextField label="a" margin="dense" />
                  </Skeleton>
                  <Skeleton>
                    <TextField label="a" margin="dense" />
                  </Skeleton>
                </div>
              ) : (
                <div>
                  <TextField
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth={true}
                    label="A1-A3"
                    name="a1a3"
                    margin="dense"
                    defaultValue={A1A3 || "0.0"}
                  />
                  <TextField
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth={true}
                    label="A4"
                    name="a4"
                    margin="dense"
                    defaultValue={A4 || "0.0"}
                  />
                  <TextField
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth={true}
                    label="B4_m"
                    name="b4m"
                    margin="dense"
                    defaultValue={B4_m || "0.0"}
                  />
                  <TextField
                    inputProps={{
                      readOnly: true,
                      disabled: true,
                    }}
                    InputProps={{ disableUnderline: true }}
                    fullWidth={true}
                    label="B4_t"
                    name="b4t"
                    margin="dense"
                    defaultValue={B4_t || "0.0"}
                  />
                </div>
              )}
            </Grid>
          </Grid>

          <Divider variant="middle" light={true} className={classes.divider} />

          <BuildingElementsView
            buildingId={props.selectedBuildingId}
            parentIsLoading={loading}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default BuildingInfoDrawer;
