import React from "react";
import { Grid, Typography, Chip, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";

import emailjs from "emailjs-com";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: "30px 0px",
  },
  sizesWrapper: {
    padding: "10px 0px",
    margin: "5px 10px 20px 0px",
    width: 400,
    borderRadius: 16,
    border: "1px solid #c4c4c4",
  },
  Chip: {
    width: "min-content",
    margin: "5px 10px 2px 0px",
  },
  variantWrapper: {
    padding: "10px 0px",
    margin: "5px 10px 5px 0px",
    width: 400,
    borderRadius: 16,
    border: "1px solid #c4c4c4",
  },
  heading: {
    fontWeight: 700,
    textTransform: "uppercase",
  },
  selectedImages: {
    width: 170,
    height: 170,
    borderRadius: "4px",
    marginRight: 20,
  },
}));
const Sendmail = (data) => {
  const {
    price,
    tableName,
    email,
    firstName,
    lastName,
    mobileNumber,
    address,
    country,
    province,
    quantity,
    shipmentPrice,
    city,
    orderID,
  } = data;
  const totalPrice = price + shipmentPrice;
  const detail = {
    price,
    email,
    firstName,
    lastName,
    mobileNumber,
    address,
    country,
    province,
    quantity,
    shipmentPrice,
    city,
    tableName,
    totalPrice,
    orderID,
  };
  console.log(detail);
  emailjs
    .send(
      "service_0o32nkd",
      "template_97qk8a5",
      detail,
      "user_AMdLkQAzKg8l9t02AVlpH"
    )
    .then((error) => {
      console.log(error.text);
    });
};
const OrderDetails = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.wrapper} container direction="column">
      <h1 className={classes.heading}>Order Details:</h1>
      <br />
      <Typography className={classes.heading}>Order ID</Typography>
      <Typography variant="body1">{data.orderID}</Typography>
      <br />

      <Typography className={classes.heading}>Table Name</Typography>
      <Typography variant="body1">{data.tableName}</Typography>
      <br />

      <Typography className={classes.heading}>Quantity</Typography>
      <Typography variant="body1">{data.quantity}</Typography>
      <br />

      <Typography className={classes.heading}> Name</Typography>
      <Typography variant="body1">{(data.firstName, data.lastName)}</Typography>
      <br />

      <Typography className={classes.heading}>Phone Number</Typography>
      <Typography variant="body1">{data.mobileNumber}</Typography>

      <br />
      <Typography className={classes.heading}>Email</Typography>
      <Typography variant="body1">{data.email}</Typography>
      <br />
      <Typography className={classes.heading}>Address</Typography>
      <Typography variant="body1">
        {" "}
        {data.address + data.city + data.country}
      </Typography>
      <br />

      <h1 className={classes.heading}>Shipping Details:</h1>
      <Typography className={classes.heading}>Shipping Price</Typography>
      <Typography variant="body1">{data.shipmentPrice}</Typography>
      <br />
      <Typography className={classes.heading}>Price</Typography>
      <Typography variant="body1">{data.price}</Typography>
      <br />
      <Typography className={classes.heading}>Total Price</Typography>
      <Typography variant="body1">{data.totalPrice}</Typography>
      <br />

      <Button
        color="primary"
        style={{ padding: "10px 20px", width: 150 }}
        onClick={() => Sendmail(data)}
        variant="contained"
      >
        Confirmation Email
      </Button>
    </Grid>
  );
};

export default OrderDetails;
