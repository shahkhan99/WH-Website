import React, { useState } from "react";
import ViewPartners from "./ViewPartners";
import AddPartners from "./AddPartners";
import { AppBar, Tab, Tabs } from "@material-ui/core";

const PartnersLogo = () => {
  const [state, setState] = useState(0);

  return (
    <div style={{ width: "100%" }}>
      <AppBar position="static">
        <Tabs
          indicatorColor="secondary"
          value={state}
          onChange={(e, v) => setState(v)}
        >
          <Tab label="Add a new Partner" style={{ width: 200 }} />
          <Tab label="view New Partners" style={{ width: 200 }} />
        </Tabs>
      </AppBar>
      {state === 0 && <AddPartners />}
      {state === 1 && <ViewPartners />}
    </div>
  );
};

export default PartnersLogo;
