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
          Click on a row to see more details about the building, including its{" "}
          <b>building elements</b> and <b>materials</b>.
        </li>
        <li>
          Select multiple rows to compare buildings and calculate average
          values.
        </li>
      </ul>
    </div>
  );

  static readonly helpDict: { [key: string]: JSX.Element } = {
    main: HelpStrings.mainText,
  };
}

export default HelpStrings;
