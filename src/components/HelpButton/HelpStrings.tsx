import Typography from "@material-ui/core/Typography";
import React from "react";

class HelpStrings {
  static readonly mainText = (
    <div>
      {/* <Typography variant="body1" gutterBottom>
                Click on a row to see more details about the building, including its <b>building elements</b> and <b>materials</b>.
            </Typography>
            <Typography variant="body1" >
                Select multiple rows to compare buildings and calculate average values.
            </Typography>
            <Typography variant="body1" gutterBottom>
                You must select <b>at least two buildings</b>.
            </Typography> */}
      <ul>
        <li>
          <Typography >
            Click on a row to see more details about the building, including its{" "}
            <b>materials</b> and <b>building elements</b>.
          </Typography>
        </li>
        <li>
          Turn on <b>simulation mode</b> to edit a building's materials and see how the changes affect the rest of the building.
        </li>
        <li>
          Select multiple rows to <b>compare</b> the emission values of different buildings.
        </li>
      </ul>
    </div>
  );

  static readonly helpDict: { [key: string]: JSX.Element } = {
    main: HelpStrings.mainText,
  };
}

export default HelpStrings;
