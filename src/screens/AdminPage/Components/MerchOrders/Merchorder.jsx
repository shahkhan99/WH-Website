import React, { Component } from "react";
import {
  DeleteOneOrder,
  Getallorder,
} from "../../../../Services/Admin-Service";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import Table from "./OrderTable";
import OrderDetails from "./OrderDetails";
import Confirmation from "./Confirmation";

export default class Merchorder extends Component {
  state = { loading: true };
  componentDidMount() {
    this.FetchOrders();
  }
  FetchOrders = () => {
    Getallorder().then((docs) => {
      this.setState({ allOrders: docs, loading: false });
    });
  };
  onClickDelete = (event) => {
    const { id } = event.currentTarget;
    const { allOrders } = this.state;
    const index = allOrders.findIndex((x) => x.orderID === id);
    this.setState({ confirmAlert: true, index });
  };
  onCloseAlert = (event) => {
    this.setState({ index: null, confirmAlert: false });
  };

  DeleteProduct = (event) => {
    const { allOrders, index } = this.state;

    this.setState({ loading: true, confirmAlert: false }, () => {
      const id = allOrders[index].orderID;
      let Temp = allOrders.slice();
      Temp.splice(index, 1);
      console.log(id);

      DeleteOneOrder({ orderID: id }).then(() => {
        this.setState({ allOrders: Temp, index: null, loading: false });
      });
    });
  };
  onClickDetails = (event) => {
    const { id } = event.currentTarget;
    const { allOrders } = this.state;
    const index = allOrders.findIndex((x) => x.orderID === id);
    console.log(index);
    this.setState({ details: true, index }, () => {
      window.scrollTo(0, 710);
    });
  };
  render() {
    const { allOrders, details, index, confirmAlert, loading, products } =
      this.state;
    return (
      <div style={{ width: "100%" }}>
        <AppBar position="static">
          <Tabs indicatorColor="secondary">
            <Tab label="View All Orders" />
          </Tabs>
        </AppBar>
        <Table
          data={allOrders}
          onDetails={this.onClickDetails}
          onDelete={this.onClickDelete}
          loading={loading}
        ></Table>
        {confirmAlert && (
          <Confirmation
            data={allOrders[index]}
            open={confirmAlert}
            onDelete={this.DeleteProduct}
            onCLose={this.onCloseAlert}
          />
        )}
        <div style={{ width: "100%", paddingLeft: "50px" }}>
          {" "}
          {details && <OrderDetails data={allOrders[index]} />}
        </div>
      </div>
    );
  }
}
