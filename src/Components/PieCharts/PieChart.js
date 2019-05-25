import React, { Component } from 'react'
import { Pie  , fillPattern} from 'react-chartjs-2';
import Table from '../Table/Table';
import './PieChart.css';
const myContext = React.createContext();


export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphType: 'province',
      tableType : 'province',
      data: {},
      uniquecities: [],
      countofuniquecities: [],
      //updated table state getting set and verified in render
      //updatedtabledata  : []

    }
  }



  handleevent = (elem) => {
    //console.log("index handler called" , elemmm)
    let index = elem[0]._index;
    //console.log("index here",elemmm[0]._index)
    let graphType;
    if (this.state.graphType === 'province') {
      graphType = 'city'
    }
    else if (this.state.graphType === "city") {
      graphType = 'province'
    }

    this.setState({ graphType })



    let tableType;
    if( this.state.tableType === 'province'){
      tableType = 'city'
    }
    else if(this.state.tableType === 'city'){
      tableType = 'province'
    }
    this.setState({tableType})

        let maindata = this.props.mainarray;
    let uniqueprovince = this.props.province;
    let count = 0;
    let citiesofselectedprovince = [];
    let updatedtabledata = [];
    //console.log(uniqueprovince[index])

    maindata.forEach(element => {
      //console.log(element.province);
      console.log(index);
      if (element.province == uniqueprovince[index]) {
        updatedtabledata.push(element)
        citiesofselectedprovince.push(element.city)
      }
    });



    console.log(" updated table data", updatedtabledata);
    this.setState({ updatedtabledata }, () => {
      //console.log("updated data for table ",updatedtabledata);
    });

    const distinct = (value, index, self) => {
      return self.indexOf(value) === index;
    }
    const distinctcities = citiesofselectedprovince.filter(distinct);
    let citiesunique = [];
    let citiescount = [];

    distinctcities.forEach(function (uniquec) {
      var countcities = 0;
      for (var i = 0; i < citiesofselectedprovince.length; ++i) {
        if (citiesofselectedprovince[i] == uniquec)
          countcities++;
      }
      citiesunique.push(uniquec);
      citiescount.push(countcities);

    })

    this.setState({ uniquecities: citiesunique, countofuniquecities: citiescount })

  }
  //       Function to get data for pie chart provinces / citizens

  dataforprovincepiechart = () => {
    let i = 0;
    let chartdata = {
      labels: this.props.province,
      datasets: [
        {
          data: this.props.citizens,
          backgroundColor:  ["#aeb3ba" , "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
        }
      ]
    }

    return chartdata;
  }
// Function to get data for pie chart cities/ No of ciizens in selected province
  dataforpiechartcities = () => {
    let i = 0;
    let chartdata = {
      labels: this.state.uniquecities,
      datasets: [
        {
          data: this.state.countofuniquecities,
          backgroundColor:  ["#c2c9d3" , "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA" , "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA", "#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA" , "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA" , "#0074D9", "#FF4136", "#2ECC40"]
         }
      ]
    }

    return chartdata;
  }


  render() {
    if (this.state.updatedtabledata) {
      //console.log("data state update in render", this.state.updatedtabledata);
    }
    let chartdata = this.dataforprovincepiechart();

    let dataforcitygrapgh = this.dataforpiechartcities();
  
    return (

     <div className="main-class">
        {/* <div className="chart"> */}
        <div className="pie-chart-style">
          <Pie
            data={this.state.graphType === 'province' ? chartdata : dataforcitygrapgh}
            options={{}}
            getElementAtEvent={(elems) => {
              this.handleevent(elems)
            }
            }
            
          />
          </div>
          
          <div className="table-style">

            <Table data= {this.state.tableType === 'province' ? this.props.tabledata : this.state.updatedtabledata }
            
             /> 
        </div>
      </div>
    )
  }
}




























