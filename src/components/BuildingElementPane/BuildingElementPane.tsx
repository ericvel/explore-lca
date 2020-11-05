import React, { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import './BuildingElementPane.css'
import ReactDOM from "react-dom";

const initialBuildingState: Building = {
    idbuildings: 0,
    building_identifier: 0,
    building_name: "",
    country: "",
    city: "",
    typology: ""
};

const initialSelectedElementState: BuildingElement = {
    idlevels: 0,
    name: "",
    hierarchy: 0,
};

const BuildingElementPane = (props: any) => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [building, setBuilding] = useState<Building>(initialBuildingState);
    const [buildingElements, setBuildingElements] = useState<BuildingElement[]>([]);
    const [selectedElement, setSelectedElement] = useState<BuildingElement>(initialSelectedElementState);

    useEffect(() => {
        if (props.selectedRowId !== undefined) {
            loadData();
            setIsPaneOpen(true);
        } else {
            setIsPaneOpen(false);
        }
    }, [props.selectedRowId]);

    /* useEffect(() => {
        console.log("Re-render")
    }, [building, buildingElements])
 */
    const loadData = () => {
        const buildingQuery = `/buildings/${props.selectedRowId}`;
        const buildingElementQuery = `/building_elements/${props.selectedRowId}`;
        if (!loading) {
            setLoading(true);
            Promise.all([
                fetch(buildingQuery),
                fetch(buildingElementQuery)
            ]).then(responses => Promise.all(responses.map(response => response.json())
            )).then(data => {
                //console.log("Building elms: ", data[1]);
                ReactDOM.unstable_batchedUpdates(() => {
                    setBuilding(data[0][0]);
                    setBuildingElements(data[1]);
                    const rootElement = data[1].find((element: BuildingElement) => element.hierarchy === 0);
                    if (rootElement !== undefined) setSelectedElement(rootElement);
                    setLoading(false);
                });
            }).catch(() => setLoading(false));
        }
    };

    const getChildElements = (parentElement: BuildingElement) => {
        /* if (parentElement.hierarchy == 0) {
            return buildingElements.filter(element => element.hierarchy === 1);
        } */

        const childElements = buildingElements.filter(element => element.idparent === parentElement.idlevels);

        if (childElements !== undefined) {
            return childElements;
        }

        return [];
    }

    const changeSelectedElement = (elementId: number) => {
        const newSelection = buildingElements.find(element => element.idlevels === elementId);
        if (newSelection !== undefined) setSelectedElement(newSelection);
    }

    const {
        building_identifier, building_name, country, city, typology
    } = building;

    const {
        name, A1A3, A4, B4_m, B4_t
    } = selectedElement;

    const childElements = getChildElements(selectedElement);

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
                    <h3>GWP</h3>
                    <p>
                        <b>A1-A3:</b> {A1A3} <br />
                        <b>A4:</b> {A4} <br />
                        <b>B4_m:</b> {B4_m} <br />
                        <b>B4_t:</b> {B4_t} <br />
                    </p>
                    <h2>Building elements</h2>
                    {childElements.map(child =>
                        <div>
                            <p>{child.idlevels} - {child.name}</p>

                            <Button variant="outlined" onClick={() => changeSelectedElement(child.idlevels)}>
                                See children -{'>'}
                            </Button>
                        </div>
                    )}
                </div>
            </SlidingPane>
        </div>
    );
};

export default BuildingElementPane;