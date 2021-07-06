import React from "react";
import MaterialTable from "material-table";
import { Typography, Button } from "@material-ui/core";

import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import TableLoader from "../../Common/TableLoader";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const options = {
  headerStyle: {
    cursor: "pointer",
    fontWeight: 650,
    zIndex: 2,
    fontFamily: "'Roboto Mono', monospace",
  },
  showTitle: false,
};

export default function EnhancedTable({ data, loading, onDetails, onDelete }) {
  const columns = [
    {
      title: "Order ID",
      field: "orderID",
      render: (rowData) => (
        <Typography variant="subtitle2">{rowData.orderID}</Typography>
      ),
    },
    {
      title: "Name",
      field: "tableName",
      render: (rowData) => (
        <Typography variant="subtitle2">{rowData.tableName}</Typography>
      ),
    },
    // { title: 'Description', field: 'short_description', render: rowData => <Typography variant='subtitle2'>{`${rowData.short_description.substring(0, 50)} ...`}</Typography> },
    {
      title: "Price",
      field: "price",
      render: (rowData) => (
        <Typography variant="subtitle2">{rowData.price}</Typography>
      ),
    },
    {
      title: "Details",
      field: "details",
      render: (rowData) => (
        <Button
          style={{ fontSize: 12 }}
          variant="outlined"
          color="primary"
          id={rowData.orderID}
          onClick={onDetails}
        >
          Details
        </Button>
      ),
    },
    {
      title: "Delete",
      field: "delete",
      render: (rowData) => (
        <Button
          style={{ fontSize: 12 }}
          variant="contained"
          color="primary"
          id={rowData.orderID}
          onClick={onDelete}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <MaterialTable
      options={options}
      icons={tableIcons}
      isLoading={loading}
      components={{ OverlayLoading: TableLoader }}
      columns={columns}
      data={data}
    />
  );
}
