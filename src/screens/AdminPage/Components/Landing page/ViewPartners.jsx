import React, { Component } from "react";
import {
  GetAllPartner,
  DeleteOnePartners,
} from "../../../../Services/Admin-Service";

import Table from "./PartnersTable";
import Confirmation from "./Confirmation";
import PartnersDetails from "./PartnersDetails";
import EditPartners from "./EditPartners";

class ViewPartners extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.FetchProducts();
  }

  FetchProducts = () => {
    GetAllPartner("all").then((docs) => {
      this.setState({ products: docs, loading: false });
    });
  };

  onClickDelete = (event) => {
    const { id } = event.currentTarget;
    const { products } = this.state;
    const index = products.findIndex((x) => x.id === id);

    this.setState({ confirmAlert: true, index });
  };

  onCloseAlert = (event) => {
    this.setState({ index: null, confirmAlert: false });
  };

  DeleteProduct = (event) => {
    const { products, index } = this.state;

    this.setState({ loading: true, confirmAlert: false }, () => {
      const id = products[index].id;
      let Temp = products.slice();
      Temp.splice(index, 1);

      DeleteOnePartners({ id }).then(() => {
        this.setState({ products: Temp, index: null, loading: false });
      });
    });
  };

  onClickDetails = (event) => {
    const { id } = event.currentTarget;
    const { products } = this.state;
    const index = products.findIndex((x) => x.id === id);

    this.setState({ details: true, index }, () => {
      window.scrollTo(0, 710);
    });
  };

  onClickEdit = (event) => {
    const { products, index } = this.state;
    let data = products[index];
    this.setState({ data, details: false, edit: true }, () => {
      window.scrollTo(0, 710);
    });
  };

  render() {
    const { products, edit, details, index, confirmAlert, loading } =
      this.state;

    return (
      <div style={{ padding: "50px" }}>
        <Table
          data={products}
          onDetails={this.onClickDetails}
          onDelete={this.onClickDelete}
          loading={loading}
        />

        {confirmAlert && (
          <Confirmation
            data={products[index]}
            open={confirmAlert}
            onDelete={this.DeleteProduct}
            onCLose={this.onCloseAlert}
          />
        )}

        {details && (
          <PartnersDetails data={products[index]} onEdit={this.onClickEdit} />
        )}
        {edit && <EditPartners editData={products[index]} />}
      </div>
    );
  }
}

export default ViewPartners;
