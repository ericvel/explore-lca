import React, { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CloseIcon from '@material-ui/icons/Close';
import './BuildingElementPane.css'

const BuildingElementPane = (props: any) => {
    const [isPaneOpen, setIsPaneOpen] = useState(false);

    useEffect(() => {
        if (props.selectedRowId !== undefined) {
            setIsPaneOpen(true)
        } else {
            setIsPaneOpen(false)
        }
    }, [props.selectedRowId])

    return (
        <div>
            {/* <button onClick={() => setIsPaneOpen(true)}>
                Click to open right pane
          </button> */}
            <SlidingPane
                className="sliding-pane close-button"
                overlayClassName="sliding-pane-overlay"
                isOpen={isPaneOpen}
                title={`Row ID: ${props.selectedRowId}`}
                subtitle="Subtitle"
                width="400px"
                closeIcon={<CloseIcon fontSize="large"/>}
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setIsPaneOpen(false);
                }}
            >
                <div>Text hello hello</div>
            </SlidingPane>
        </div>
    );
};

export default BuildingElementPane;