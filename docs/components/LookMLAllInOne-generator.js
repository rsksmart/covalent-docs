import React from 'react';
import "../css/components/topic-calculator.css";

class LookMLAllInOneApp extends React.Component {
  constructor() {
    super();
    this.state = {
      address_input: "0xc00e94cb662c3520282e6f5717214004a7f26888",
      error: false,
      error_message: "",
      text: "Copy to clipboard",
      chain_name: "chain_eth_mainnet",
      chain_id: "1",
      all_chains_data: []
    };
  }

  async componentDidMount() {
    await this._fetchAllChainsData();
  }

  _fetchAllChainsData = async () => {
    const response = await fetch("https://api.covalenthq.com/v1/chains/?key=ckey_6b87a4a549ff46e6971c3e6341f")
    if (response.ok) {
      const data = await response.json()
      this.setState({all_chains_data: data.data.items});
    } else {
      this.setState({error: true});
    }
  }

  _renderOptions = (db_schema_name, label, chain_id) => {
    return (<option value={db_schema_name+","+chain_id}>{label}</option>);
  }

  copyToClipboard = (contents) => {
    // tslint:disable-next-line:no-unused
    let selectedText = "";
    const fakeElement = document.createElement("textarea");
    fakeElement.style.fontSize = "12pt";
    fakeElement.style.border = "0";
    fakeElement.style.padding = "0";
    fakeElement.style.margin = "0";
    fakeElement.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px";
    fakeElement.style.position = "fixed";
    fakeElement.style[document.documentElement.getAttribute("dir") === "rtl" ? "right" : "left"] = "-9999px";
    fakeElement.setAttribute("readonly", "");

    fakeElement.value = contents;
    document.body.appendChild(fakeElement);
    fakeElement.focus();
    fakeElement.setSelectionRange(0, fakeElement.value.length);

    selectedText = fakeElement.value;

    document.execCommand("copy");
    (window.getSelection()).removeAllRanges();
  };

  _consolidateLookML = (lookMLRes) => {
    let textArray = lookMLRes.props.children;
    let bigStr = "";
    for (let x of textArray) {
      if (typeof x === 'string' || x instanceof String) {
        if (x.length !== 0) {
          bigStr += x;
        }
      }
      else {
        bigStr += "\n";
      }
    }
    return bigStr;
  }

  _copyAllInOne = ( bigStr ) => {
    document.getElementById("all-in-one").innerText = "Copied!";
    this.copyToClipboard(bigStr);
  }

  _renderEvents = () => {
    if (this.state.events !== undefined){
      let items;
      for (var i = 0; i < this.state.events.data.items.length; i++) {
        if ("contract_address" in this.state.events.data.items[i]) {
          if (items === undefined) {
            items = this.state.events.data.items[i].abi_items;
          } else {
            items = items.concat(this.state.events.data.items[i].abi_items);
          }
        }
      }
      let a = items.filter(( item ) => {return item.signature !== null;})

      let bigResult = [];
      let bigArray = [];
      for (let i = 0; i < a.length; i++) {
        const result = this._lookml(a[i].topic_hash, a[i].abi);
        let consolidated = this._consolidateLookML(result);

        bigResult.push(result);
        bigArray.push(consolidated);
      }
      const allInOneStr = bigArray.join("\n");

      return (
        <div className="topics">
          <div>
            Found the following {a.length} Topics:
          </div>
          <div>
            { a.map( ( item ) => {
              return (
                <div>
                  <h5>
                    {item.signature.replace(/([A-Z])/g, ' $1').trim()}
                  </h5>
                  <code>
                    {"Hashcode: " + item.topic_hash}
                  </code>
                </div>
              );
            })}
          </div>
          <div>
            <p>Auto-generated LookML Views start from here:</p>
            <ul style={{listStyleType: "none", paddingLeft: 0}}>
              <div className="box" style={{position: "relative"}}>
                <li>
                  <button
                    style={{ position: "absolute", right: 0, top: 62, paddingLeft: 10, paddingRight: 10, }}
                    id={"all-in-one"}
                    className="buttonW"
                    onClick={this._copyAllInOne.bind(this, allInOneStr)}
                  >
                    <svg style={{ width: 25, height: 25 }} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="17" height="17" rx="2" stroke="white" strokeWidth="3"/>
                      <path d="M12 19.9688V27C12 28.1046 12.8954 29 14 29H27C28.1046 29 29 28.1046 29 27V14C29 12.8954 28.1046 12 27 12H19.9688" stroke="white" strokeWidth="3"/>
                    </svg>
                  </button>
                </li>
                <pre>
                  { bigResult }
                </pre>
              </div>
            </ul>
          </div>
        </div>
      );
    }
  }

  _lookml = (s,e) => {
    // s: item.topic_hash
    // e: item.abi
    // create looker view name: switch from Camel Case to Snake Case
    const viewname = e.name.split(/(?=[A-Z])/).join('_').toLowerCase();
    let inputs = e.inputs;
    // console.log(viewname);
    // console.log(typeof viewname);

    const ifields =
      inputs
        .filter(input => input.indexed)
        .map((inp,i) => {
          switch (inp.type) {
            case "address":
              return "'0x' || encode(extract_address(e.topics[" + (i + 2) + "]), 'hex') AS logged_" +
                inp.name.toLowerCase();
            default:
              return "e.topics[" + (i + 2) + "] AS logged_" + inp.name.toLowerCase();
          }
        });

    const datafields =
      inputs
        .filter(input => !input.indexed)
        .map((inp,i) => {
          switch (inp.type) {
            case "address":
              return "'0x' || encode(extract_address(abi_field(e.data, " + i + ")), 'hex') AS logged_" +
                inp.name.toLowerCase();
            default:
              return "cast(abi_field(e.data, " + i + ") as numeric) AS logged_" + inp.name.toLowerCase();
          }
        });

    const dimensionfields =
      inputs
        .map((inp) => {
          switch (inp.type) {
            case "address":
              return " dimension: "+ inp.name.toLowerCase() + " { \n " +
                " type: string\n" +
                " sql: ${TABLE}.\"logged_" + inp.name.toLowerCase() + "\" ;;\n" +
                " } \n"
                ;
            default: // default as uint256
              return  " dimension: "+ inp.name.toLowerCase() + " { \n " +
                " type: number\n" +
                " sql: ${TABLE}.\"logged_" + inp.name.toLowerCase() + "\" ;;\n" +
                " } \n"
                ;
          }
        });

    const measurefields =
      inputs
        .map((inp) => {
          switch (inp.type) {
            // "string" type: i.e. type address in function parameter
            case "address":
              return  " measure: distinct_" + inp.name.toLowerCase() + " { \n " +
                " type: count_distinct\n  " +
                " hidden: yes \n " +
                " sql: ${" + inp.name.toLowerCase() + "} ;; \n" +
                "  } \n" +
                " \n " +
                " measure: change_" + inp.name.toLowerCase() + " { \n" +
                " type: percent_of_previous\n " +
                " hidden: yes \n " +
                " sql: ${distinct_" + inp.name.toLowerCase() + "} ;; \n" +
                " } \n" +
                " \n " +
                " measure: list_" + inp.name.toLowerCase() + " { \n " +
                " type: list \n " +
                " hidden: yes \n " +
                " list_field: " + inp.name.toLowerCase() + " \n " +
                " }"
                ;
            // "integer" type: i.e. type uint256 in function parameter (default)
            default:
              return  " measure: total_" + inp.name.toLowerCase() + " { \n " +
                " type: sum\n" +
                " hidden: yes\n" +
                " sql: ${" + inp.name.toLowerCase() + "} ;;\n" +
                " }\n" +
                "\n" +
                " measure: avg_" + inp.name.toLowerCase() + " { \n " +
                " type: average\n" +
                " hidden: yes\n" +
                " sql: ${" + inp.name.toLowerCase() + "} ;; \n " +
                " }\n" +
                "\n" +
                " measure: running_total_" + inp.name.toLowerCase() + " { \n " +
                " type: running_total\n" +
                " hidden: yes\n" +
                " sql: ${" + inp.name.toLowerCase() + "} ;; \n " +
                " }\n" +
                "\n" +
                " measure: change_" + inp.name.toLowerCase() + " { \n " +
                " type: percent_of_previous\n" +
                " hidden: yes\n" +
                " sql: ${total_" + inp.name.toLowerCase() + "} ;; \n " +
                " }"
                ;
          }
        });

    return (
      <pre>
        view: {viewname} {" { "} <br/>
        {/*  -----------  DERIVED TABLE: START  ----------  */}
        derived_table: {" { "} <br/>
        sql: <br/>
        SELECT <br/>
        {"    e.block_signed_at,"} <br/>
        {"    e.block_height,"} <br/>
        {"    '0x' || encode(e.tx_hash, 'hex') AS tx_hash,"} <br/>
        {"    " + ifields.join(", \n    ")} {datafields.length > 0 ? "," : ""}   <br/>
        {"    " + datafields.join(", \n    ")} <br/>
        FROM {this.state.chain_name}.block_log_events e <br/>
        WHERE <br/>
        {"    "} e.topics @> ARRAY[{"'\\x" + this.state.address_input.substr(2) + "'"}::byta]  <br/>
        {"    "} AND e.sender = {"'\\x" + this.state.address_input.substr(2) + "'"}  <br/>
        {"    "} AND e.topics[1] = {"'\\x" + s.substr(2) + "'"}  <br/>
        {" ;; "}  <br/>
        {" }  "}  <br/>
        {/*  -----------  DERIVED TABLE: END  ----------  */}
        <br/>
        {/*  -----------  DIMENSIONS: HARD-CODED START  ----------  */}
        dimension_group: block_signed_at { "{" }  <br/>
        type: time <br/>
        timeframes: [date, week, month, quarter, year] <br/>
        sql: {" ${TABLE}.\"block_signed_at\" ;; "}  <br/>
        { "}" }  <br/>
        <br/>
        dimension: tx_hash { "{" }  <br/>
        type:  string  <br/>
        sql: {" ${TABLE}.\"tx_hash\" ;; "}  <br/>
        { "}" }  <br/>
        <br/>
        dimension: block_height { "{" }  <br/>
        type: number  <br/>
        sql: {" ${TABLE}.\"block_height\" ;; "}  <br/>
        { "}" }  <br/>
        {/*  -----------  DIMENSIONS: HARD-CODED END  ----------  */}
        <br/>
        {/*  -----------  DIMENSIONS: JavaScript-GENERATED START  ----------  */}
        {"    " + dimensionfields.join(" \n    ")} <br/>
        {/*  -----------  DIMENSIONS: JavaScript-GENERATED END  ----------  */}
        <br/>
        {/*  -----------  MEASURES: HARD-CODED START  ----------  */}
        measure: count { "{" } <br/>
        type: count <br/>
        { "}" } <br/>
        <br/>
        measure: distinct_tx_hash { "{" }  <br/>
        type: count_distinct  <br/>
        hidden: yes  <br/>
        sql: { " ${tx_hash} ;; " }  <br/>
        { "}" } <br/>
        <br/>
        measure: change_tx_hash { "{" }  <br/>
        type: percent_of_previous  <br/>
        hidden: yes  <br/>
        sql: { " ${distinct_tx_hash} ;; " }  <br/>
        { "}" } <br/>
        <br/>
        measure: list_tx_hash { "{" }  <br/>
        type: list  <br/>
        hidden: yes  <br/>
        list_field: tx_hash  <br/>
        { "}" } <br/>
        <br/>
        {/*  -----------  MEASURES: HARD-CODED END  ----------  */}
        <br/>
        {/*  -----------  MEASURES: JavaScript-GENERATED START  ----------  */}
        {"    " + measurefields.join(" \n    ")} <br/>
        {/*  -----------  MEASURES: JavaScript-GENERATED END  ----------  */}
        <br/>
        {" } "} <br/>
      </pre>
    );
  }

  _clickNext = () => {
    if (this.state.address_input.length === "0xc00e94cb662c3520282e6f5717214004a7f26888".length) {
      fetch(`https://api.covalenthq.com/v1/${this.state.chain_id}/events/address/` + this.state.address_input +
        "/abi/?&key=ckey_4d5b231f1a584413ae6c3715bcf")
        .then(response => response.json())
        .then(( data ) => {
          if(data.data.items.length === 0) {
            this.setState({
              error: true,
              error_message: "Invalid contract address!"});
          } else {
            this.setState({
              events: data, //data
              error: false
            });
          }})
        .catch(( err ) => {
          console.log(err + " thrown out when fetching the API!");
        })
    } else {
      this.setState({
        error: true,
        error_message: "Contract address shorter than expected!"
      });
    }
  }

  _inputAddress = (e) => {
    this.setState({
      //under setState, can just set one field
      // e here is the value when calling this function
      // when setState is called, calling render function again
      address_input: e.target.value
    });
  }

  _inputChainId = (e) => {
    const myArr = e.target.value.split(",");
    this.setState({
      chain_name: myArr[0],
      chain_id: myArr[1]
    })
  }

  render() {
    var err = this.state.error ? this.state.error_message : null;
    return (
      <div className="topics">
        {this.state.all_chains_data.length !== 0 ?
          <div>
            <p>Enter the contract address:</p>
            <input placeholder="Contract address"
                   value={this.state.address_input}
                   onChange={this._inputAddress}
                   style={{marginRight: "1rem", border: "none"}}
            />
            <select style={{marginRight: "1rem", height: 39}} onChange={this._inputChainId}>
              {this.state.all_chains_data.map(o => this._renderOptions(o.db_schema_name, o.label, o.chain_id))}
            </select>
            <button onClick={this._clickNext} >Get all-in-one LookML!</button>
          </div> : null}
        {err}
        {this.state.error?" Try to enter it again. ":(this._renderEvents())}
      </div>
    );
  }

}

export default (props) => {
  return (
    <LookMLAllInOneApp />
  )
}
