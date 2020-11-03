import React, { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CloseIcon from '@material-ui/icons/Close';
import './BuildingElementPane.css'

const initialBuildingState: Building = {
    idbuildings: 0,
    building_identifier: 0,
    building_name: "",
    country: "",
    city: "",
    typology: ""
};

const BuildingElementPane = (props: any) => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [building, setBuilding] = useState<Building>(initialBuildingState);
    //var building = {} as Building;

    useEffect(() => {
        if (props.selectedRowId !== undefined) {
            loadData();
            setIsPaneOpen(true);
        } else {
            setIsPaneOpen(false);
        }
    }, [props.selectedRowId]);

    const loadData = () => {
        const queryString = `/buildings/${props.selectedRowId}`;
        if (!loading) {
            setLoading(true);
            fetch(queryString)
                .then(response => response.json())
                .then((data) => {
                    setBuilding(data[0])
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    };

    const {
        building_identifier, building_name, country, city, typology
    } = building;

    return (
        <div>
            <SlidingPane
                className="sliding-pane close-button"
                overlayClassName="sliding-pane-overlay"
                isOpen={isPaneOpen}
                title={loading ? "Loading..." : building_name}
                subtitle={loading ? "Loading..." : "ID: " + building_identifier}
                width="100%"
                closeIcon={<CloseIcon fontSize="large" />}
                // hideHeader={true}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setIsPaneOpen(false);
                }}
            >
                <div>
                    <p>Country: {country}</p>
                    <p>City: {city}</p>
                    <p>Typology: {typology}</p>
                </div>
            </SlidingPane>
        </div>
    );
};

export default BuildingElementPane;