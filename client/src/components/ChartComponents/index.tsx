import React from "react";
import { LCAPhaseTooltip } from "interfaces/enums";

export const customizeHint = (e: any) => {
  switch (e.seriesName) {
    case "A1-A3":
      return LCAPhaseTooltip.A1A3;
      break;
    case "A4":
      return LCAPhaseTooltip.A4;
      break;
    case "B4":
      return LCAPhaseTooltip.B4;
      break;
    case "B4 (m)":
      return LCAPhaseTooltip.B4m;
      break;
    case "B4 (t)":
      return LCAPhaseTooltip.B4t;
      break;
  }
};
