import React, { useState, useEffect } from "react";
import { Grid, Typography, Hidden, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Logout } from "../../Services/Auth-Service";
import queryString from "query-string";
import Members from "./Components/Members";
// import Orders from './Components/Orders/Orders';
import Products from "./Components/Products/Products";
import Community from "./Components/Community/Community";
import Plans from "./Components/Plans/Locations";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import PhoneIcon from "@material-ui/icons/Phone";
import { People, MeetingRoom } from "@material-ui/icons";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Faqs from "./Components/FAQs/Faqs";
import Blogs from "./Components/Blogs/blogs";
import Merchorder from "./Components/MerchOrders/Merchorder";
import Dashboard from "./Components/Dashboard/views/Dashboard/Dashboard";

import PartnersLogo from "./Components/Landing page/PartnersLogo";

//import Loader from '../Common/Loader';

const useStyles = makeStyles((theme) => ({
  alignment: {
    marginTop: theme.spacing(5),
  },
  pic: {
    border: "2px solid #2e3344",
    marginTop: theme.spacing(14),
    //borderRadius:theme.spacing(50)
  },
  padd: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  paddR: {
    paddingRight: theme.spacing(3),
    position: "relative",
    top: 3,
  },
  paddT: {
    paddingTop: theme.spacing(4),
  },
  select: {
    paddingLeft: theme.spacing(3),
    backgroundColor: "#c0c0c0",
    width: 188,
    color: "white",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    cursor: "pointer",
    transition: "background 0.5s",
  },
  notSelect: {
    paddingLeft: theme.spacing(3),
    width: 188,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    cursor: "pointer",
    transition: "background 0.5s",
  },
  font: {
    fontWeight: 200,
    fontSize: 17,
  },
  root: {
    flexGrow: 1,
    width: "100%",
    bottom: 0,
    position: "fixed",
    height: 80,
  },
}));

const IndividualDashboard = (props) => {
  const [initials, setInitials] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const handleLogout = (event) => {
    setLoading(true);
    Logout().then((t) => window.open("/@dm!n/login", "_self"));
  };

  const Initialize = () => {
    const result = queryString.parse(props.location.search);
    if (result && result.NewProduct) setValue(0);
    if (result && result.Dashboard) setValue(1);

    if (result && result.NewCommunity) setValue(3);
    if (result && result.NewLocation) setValue(2);
    if (result && result.NewFaq) setValue(4);
    if (result && result.NewBlog) setValue(5);
    if (result && result.NewOrder) setValue(6);
    if (result && result.NewPartner) setValue(7);

    setInitials(true);
  };

  useEffect(() => {
    if (!initials) Initialize();
  }, [initials]);

  const classes = useStyles();
  return (
    <div>
      {/* {loading
            ?
                <Loader />
            : */}
      <div>
        <Grid container direction="row" xs={12}>
          <Hidden smDown>
            <Grid
              style={{
                paddingTop: "10px",
                minHeight: "100vh",
                background: "#F1F1F1",
              }}
              container
              direction="column"
              alignItems="flex-start"
              justify="flex-start"
              sm={2}
            >
              {/* <span onClick={()=>{setValue(1)}} className={value=="meeting"? classes.select:classes.notSelect}>
                                    <img className={classes.paddR} src={require(`../../Assets/Icons/user.png`)} height="20" width="auto"/>
                                    <Typography className={classes.font} variant="body1" component="span">Orders</Typography>
                                </span> */}
              <span
                onClick={() => {
                  setValue(1);
                }}
                className={value == 1 ? classes.select : classes.notSelect}
              >
                <img
                  className={classes.paddR}
                  src={require(`./assets/Icons/academy.png`)}
                  height="20"
                  width="auto"
                />
                <Typography
                  className={classes.font}
                  variant="body1"
                  component="span"
                >
                  Dashboard
                </Typography>
              </span>
              <span
                onClick={() => {
                  setValue(0);
                }}
                className={value == 0 ? classes.select : classes.notSelect}
              >
                <img
                  className={classes.paddR}
                  src={require(`./assets/Icons/academy.png`)}
                  height="20"
                  width="auto"
                />
                <Typography
                  className={classes.font}
                  variant="body1"
                  component="span"
                >
                  Academy
                </Typography>
              </span>

              <span
                onClick={() => {
                  setValue(2);
                }}
                className={value == 2 ? classes.select : classes.notSelect}
              >
                <img
                  className={classes.paddR}
                  src={require(`./assets/Icons/plans.png`)}
                  height="20"
                  width="auto"
                />
                <Typography
                  className={classes.font}
                  variant="body1"
                  component="span"
                >
                  Plans
                </Typography>
              </span>
              <span
                onClick={() => {
                  setValue(3);
                }}
                className={value == 3 ? classes.select : classes.notSelect}
              >
                <img
                  className={classes.paddR}
                  src={require(`./assets/Icons/comm.png`)}
                  height="20"
                  width="auto"
                />
                <Typography
                  className={classes.font}
                  variant="body1"
                  component="span"
                >
                  Community
                </Typography>
              </span>
              <span
                onClick={() => {
                  setValue(4);
                }}
                className={value == 4 ? classes.select : classes.notSelect}
              >
                <img
                  className={classes.paddR}
                  src={require(`./assets/Icons/faq.png`)}
                  height="20"
                  width="auto"
                />
                <Typography
                  className={classes.font}
                  variant="body1"
                  component="span"
                >
                  FAQ's
                </Typography>
              </span>
              <span
                onClick={() => {
                  setValue(5);
                }}
                className={value == 5 ? classes.select : classes.notSelect}
              >
                <img
                  className={classes.paddR}
                  src={require(`./assets/Icons/blogs icon.png`)}
                  height="20"
                  width="auto"
                />
                <Typography
                  className={classes.font}
                  variant="body1"
                  component="span"
                >
                  Blogs
                </Typography>
              </span>
              <span
                onClick={() => {
                  setValue(6);
                }}
                className={value == 6 ? classes.select : classes.notSelect}
              >
                <img
                  className={classes.paddR}
                  src={require(`./assets/Icons/blogs icon.png`)}
                  height="20"
                  width="auto"
                />
                <Typography
                  className={classes.font}
                  variant="body1"
                  component="span"
                >
                  Order
                </Typography>
              </span>
              <span
                onClick={() => {
                  setValue(7);
                }}
                className={value == 6 ? classes.select : classes.notSelect}
              >
                <img
                  className={classes.paddR}
                  src={require(`./assets/Icons/blogs icon.png`)}
                  height="20"
                  width="auto"
                />
                <Typography
                  className={classes.font}
                  variant="body1"
                  component="span"
                >
                  Partners LOGOs
                </Typography>
              </span>
              <Button
                onClick={handleLogout}
                style={{
                  position: "fixed",
                  bottom: "10px",
                  left: "15px",
                  width: 150,
                }}
                variant="outlined"
                color="primary"
              >
                Logout
              </Button>
            </Grid>
          </Hidden>
          <Grid
            container
            style={{ height: "100%" }}
            direction="row"
            xs={12}
            sm={10}
          >
            <Grid container>
              <img
                className={classes.padd}
                src={require(`../../../src/components/Nav/assets/images/wh.png`)}
                height="70"
                width="auto"
              />
            </Grid>
            {/* <Grid  container alignItems="flex-start">
                                { value===1 && <Orders /> }
                            </Grid> */}
            {value === 0 && <Products />}
            {value === 2 && <Plans />}
            {value === 1 && <Dashboard />}
            {value === 3 && <Community />}
            {value === 4 && <Faqs />}
            {value === 5 && <Blogs />}
            {value === 6 && <Merchorder />}
            {value === 7 && <PartnersLogo />}
          </Grid>

          <Hidden smUp>
            <Paper square className={classes.root}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="secondary"
                aria-label="icon label tabs example"
              >
                <Tab icon={<PersonPinIcon />} label="Order Details" />
                <Tab icon={<MeetingRoom />} label="Products" />
                <Tab icon={<MeetingRoom />} label="Shipment" />
              </Tabs>
            </Paper>
          </Hidden>
        </Grid>
      </div>
    </div>
  );
};

export default IndividualDashboard;
