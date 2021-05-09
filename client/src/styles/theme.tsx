import orange from "@material-ui/core/colors/orange";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    simulated: {
      main: "#ef6c00",
      light: "#ff9d3f",
      dark: "#b53d00",
    },
    reducedEmission: {
      main: "#59bf6d",
      light: "#8cf29c",
      dark: "#208e40"
    }
  },
});

export default theme;
