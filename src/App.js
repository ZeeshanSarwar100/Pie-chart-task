import React, { Component } from 'react';
import logo from './logo.svg';
import C3Chart from 'react-c3js';
import * as d3 from 'd3';
import './App.css';
import { tsConstructorType } from '@babel/types';
import Home from './Home';
import Papa from 'papaparse';
import PieChart from '../src/Components/PieCharts/PieChart';
import CSVReader from 'react-csv-reader';
import Table from '../src/Components/Table/Table';
const CSVToJSON = require("csvtojson");
const JSONToCSV = require("jsontocsv");
const file = require('./ca-500.csv')
const csv = require('csvtojson');
const MyContext = React.createContext();


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {

    return (

      <div className="container">

        <Home />

      </div>
    )
  }

}
export default App;



