import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "redux/reducers";
import allActions from "redux/actions";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";

const EditButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    
  };

  return (
    <IconButton onClick={handleClick}>
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
