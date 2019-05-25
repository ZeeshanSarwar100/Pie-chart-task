
import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './ca-500.csv';
import { ENETUNREACH } from 'constants';
import Table from '../src/Components/Table/Table';
import PieChart from '../src/Components/PieCharts/PieChart';
import './Home.css';
const CSVToJSON = require("csvtojson");


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datafromfile: [],
            keysFromFile: [],
            DP: [],
            provincearray: [],
            citizencountperprovince: [],
            Dict: []
        }
    }

    componentDidMount() {
        let datafromfile = []
        let keysFromFile = []
        d3.csv(data).then((data) => {
            let newData = CSVToJSON(data).params
            let dataKeys = Object.keys(newData);
            //console.log(dataKeys)
            dataKeys.map((dataKey) => {
                if (parseInt(dataKey) < 499) {
                    datafromfile.push(newData[dataKey])
                    keysFromFile.push(dataKey)
                }
                //console.log(newData[key].province)
            })
            this.setState({
                datafromfile,
                keysFromFile
            }, () => {
                //console.log("promise working",this.state.datafromfile)
                this.getprovincegraghdata();
            })
        }).catch(function (err) {
            throw err;
        })
    }
    //////// will return dictionary and update state for unique provinces and their number of citizens
    getprovincegraghdata = () => {
        let array = [];
        let provincenames = [];
        let citizencount = [];
        var dict = new Object();

        this.state.datafromfile.forEach(function (datainstance) {
            array.push(datainstance.province)
        })
        const distinct = (value, index, self) => {
            return self.indexOf(value) === index;
        }
        const distinctprovinces = array.filter(distinct);
        distinctprovinces.forEach(function (uniquep) {

            var count = 0;
            for (var i = 0; i < array.length; ++i) {
                if (array[i] == uniquep)
                    count++;
            }
            provincenames.push(uniquep);
            citizencount.push(count);
            dict[uniquep] = count;

        })
        this.setState({ provincearray: provincenames, citizencountperprovince: citizencount }, () => {
            //console.log(this.state.provincearray);
        });


        return dict;
    }


    render() {

        return (
            <div>

                <div >
                    <PieChart tabledata={this.state.datafromfile}province={this.state.provincearray} citizens={this.state.citizencountperprovince} mainarray={this.state.datafromfile} />
                </div>
                {/* <div className="table-style">
                    <Table data={this.state.datafromfile} />
                </div> */}

            </div>
        );
    }
}

export default Home;





















