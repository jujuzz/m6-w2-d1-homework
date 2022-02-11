import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css"

const COUNTRIES = [
  {
    country: "Italy",
    id: 0,
    visited: "Yes",
    year: "2012"
  },
  {
    country: "Japan",
    id: 1,
    visited: "No",
    year: "2023"
  },
  {
    country: "Chile",
    id:2,
    visited: "No",
    year: "2025"
  },
]

const Country = (props) => {
  return (
    <tr className="country">
      <td className="w-25 px-2 text-center">
        {props.country.country}
      </td>
      <td className="w-25 px-2 text-center">
        {props.country.visited}
      </td>
      <td className="w-25 px-2 text-center">
        {props.country.year}
      </td>
    </tr>
  )
}

class AddCountry extends React.Component{
  constructor(props){
    super(props);
    this.setTextInputRef = (e)=>{
      console.log(e.id);
      switch(e.id){
        case 'country':
          this.inputCountry = e;
          break;
        case 'visited':
          this.inputVisited = e;
          break;
        default:
          this.inputYear = e;
          break;
      }
    }
  }

  handleSubmit =(e)=>{
    e.preventDefault();
    this.props.addCountry(
      this.inputCountry.value,
      this.inputVisited.value,
      this.inputYear.value
    );
    e.target.reset();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} className="mx-3">
        <label htmlFor="country">Country</label>
        <input id="country" type="text" ref = {this.setTextInputRef} className="d-block mb-2"/>
        <label htmlFor="visited">Visited?</label>
        <input id="visited" type="text" ref = {this.setTextInputRef} className="d-block mb-2"/>
        <label htmlFor="year">Year visited/To visite</label>
        <input id="year" type="text" ref = {this.setTextInputRef} className="d-block mb-3"/>
        <button type="submit">Add Country</button>
      </form>
    )
  }
}

const CountriesList = (props)=>{
  return (
    <ul className="list-group">
      {props.countries.map((country)=>(
        <li key={country.id} className="list-group-item">
          <Country country={country}/>
        </li>
      ))}
    </ul>
  )
}

class Main extends React.Component{
  render(){
    return(
      <div className="p-3">
        <h1 className="text-danger">My Travel Plans</h1>
        <hr/>
        <AddCountry addCountry={this.props.addCountry}/>
        <hr/>
        <div className="mx-2">
          <th className="w-25 text-center">Country</th>
          <th className="w-25 text-center">Visited</th>
          <th className="w-25 text-center">Year</th>
          <CountriesList countries={this.props.countries}/>
        </div>
      </div>
    )
  }
}

const ADD_COUNTRY = "ADD_COUNTRY";
const addCountry = (country, visited, year) =>({
  type: ADD_COUNTRY,
  payload:{
    country: country,
    visited: visited,
    year: year
  }
})

const Reducer = (state=COUNTRIES, action)=>{
  switch(action.type){
    case ADD_COUNTRY:
      let country = action.payload;
      country.id = state.length;
      return state.concat(country);
    default:
      return state;
  }
}

const store = createStore(Reducer, COUNTRIES)
const mapStateToProps = (state)=>{
  return {
    countries: state
  };
}

const mapDispatchToProps = (dispatch)=>(
  {
  addCountry:(country, visited, year)=>dispatch(addCountry(country, visited, year))
});

const AppExport = connect(mapStateToProps, mapDispatchToProps)(Main)
const App = ()=>{
  return (
    <Provider store={store}>
      <AppExport/>
    </Provider>
  )
}

export default App;