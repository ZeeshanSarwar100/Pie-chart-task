import React, { Component } from "react";
import { render } from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";


class Table extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }




  render() {
    const { data } = this.state;
    return (

      <div>
        <ReactTable
          data={this.props.data}
          columns={[
            {
              Header: "Table",
              columns: [
                {
                  Header: "First Name",
                  accessor: "first_name"
                },
                {
                  Header: "Last Name",
                  accessor: "last_name"
                },
                {
                  Header: "Company Name",
                  accessor: "company_name"
                },
                {
                  Header: "City Name",
                  accessor: "city"
                },
                {
                  Header: "Province Name",
                  accessor: "province"
                },
              ]
            },

          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />

      </div>
    );
  }
}


export default Table;
