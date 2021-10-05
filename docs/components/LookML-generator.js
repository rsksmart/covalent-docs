import React from 'react'; // import this b/c we want to use class-based
import "../css/components/topic-calculator.css";

class LookMLApp extends React.Component {
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

    _renderEvents = () => {
        if (this.state.events !== undefined){

            let items;
            console.log(this.state.events.data.items.length);
            // this.state.events.data.items:
            //    corresponds to the "data"."items" in the JSON object
            //    from here: https://api.covalenthq.com/v1/1/events/address/0xc00e94cb662c3520282e6f5717214004a7f26888/abi/?&key=ckey_4d5b231f1a584413ae6c3715bcf
            console.log(this.state.events.data.items);
            // the length of this.state.events.data.items is a list of length 1
            // hence there is ONLY
            // this.state.events.data.items[0] available, which is a JSON object
            console.log(this.state.events.data.items[0]);
            for (var i = 0; i < this.state.events.data.items.length; i++) {
                if ("contract_address" in this.state.events.data.items[i]) {
                    if (items === undefined) {
                        items = this.state.events.data.items[i].abi_items;
                    } else {
                        items = items.concat(this.state.events.data.items[i].abi_items);
                    }
                }
            }
            console.log(items.length);
            console.log(items);
            // NOTE: the items defined in the above for-loop is a length of 24 array
            // namely the abi_items from (below), which is under "data"."items"."abi_items"
            // https://api.covalenthq.com/v1/1/events/address/0xc00e94cb662c3520282e6f5717214004a7f26888/abi/?&key=ckey_4d5b231f1a584413ae6c3715bcf
            //  let items = this.state.events.data.items[0].abi_items;
            // the name of the "items" is "abi_items"
            // the type of the "items" is array
            // the length of the "items" is 24
            let a =
                items
                    .filter(
                        ( item )=> {
                            return item.signature !==null;
                        }
                    )
            // the above section FILTER out every <item> from <items> (defined in the for-loop above),
            // as long as the signature of each <item> is null
            // Hence, there are only 4 <item> left
            console.log("Is a an Array? : " + Array.isArray(a));
            console.log(a);
            return (
                <div className="topics">
                    <p>Found {a.length} Topics:</p>
                    { a
                        .map(item => {
                            const result = this._lookml(item.topic_hash, item.abi);
                            return (
                                <div>
                                    <ul style={{listStyleType: "none", paddingLeft: 0}}>
                                        <h3> {item.signature.replace(/([A-Z])/g, ' $1').trim()} </h3>
                                        <div className="box" style={{position: "relative"}}>
                                            <code>{item.topic_hash}</code>
                                            {result}
                                            <li>
                                                <button
                                                    style={{
                                                        position: "absolute",
                                                        right: 0,
                                                        top: 62,
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                    }}
                                                    id={item.topic_hash}
                                                    className="buttonW"
                                                    onClick={this._copyFunction.bind(this, result, item.topic_hash)}
                                                >
                                                    <svg style={{width: 25, height: 25}} width="32" height="32" viewBox="0 0 32 32" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <rect x="3" y="3" width="17" height="17" rx="2" stroke="white" strokeWidth="3"/>
                                                        <path
                                                            d="M12 19.9688V27C12 28.1046 12.8954 29 14 29H27C28.1046 29 29 28.1046 29 27V14C29 12.8954 28.1046 12 27 12H19.9688"
                                                            stroke="white" strokeWidth="3"/>
                                                    </svg>
                                                </button>
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                            );
                        })
                    }
                </div>
            );

        }
    }

    // s: item.topic_hash
    // e: item.abi
    _lookml = (s,e) => {
        // console.log("Hello");
        // console.log("World");
        // Camel Case vs Snake Case
        // console.log(e.name.split(/(?=[A-Z])/).join('_').toLowerCase());
        // 1. create view name
        const viewname = e.name.split(/(?=[A-Z])/).join('_').toLowerCase();
        console.log(e.name);
        console.log(viewname);

        // define <inputs> as: e.inputs, i.e. item.abi.inputs
        // the <inputs> here is an Array of JSON objects of length 3
        let inputs = e.inputs;
        // say we are exploring the first in the Array, i.e., inputs[0]
        console.log(inputs[0]);

        const ifields =
            inputs
                .filter(input => input.indexed)
                .map(
                    (inp,i)=>{
                        // if inputs.indexed == true then
                        switch (inp.type) {
                            case "address":
                                return "'0x' || encode(extract_address(e.topics[" + (i + 2) + "]), 'hex') AS logged_"
                                    + inp.name.toLowerCase();
                            default:
                                return "e.topics[" + (i + 2) + "] AS logged_" + inp.name.toLowerCase();
                        }
                    }
                );
        // data fields that corresponds to
        const datafields =
            inputs
                .filter(input => !input.indexed) // filter that the input.indexed === false
                .map(
                    (inp,i) => {
                        switch (inp.type) {
                            case "address":
                                return "'0x' || encode(extract_address(abi_field(e.data, " + i + ")), 'hex') AS logged_"
                                    + inp.name.toLowerCase();
                            default:
                                return "cast(abi_field(e.data, " + i + ") as numeric) AS logged_" + inp.name.toLowerCase();
                        }
                    }
                );

        const dimensionfields =
            inputs // .filter(input => input.indexed)
                .map(
                    (inp)=>{
                        // if inputs.indexed == true then
                        switch (inp.type) {
                            case "address":
                                return  " dimension: logged_"+ inp.name.toLowerCase() + " { \n " +
                                    " type: string\n" +
                                    " sql: ${TABLE}.\"logged_" + inp.name.toLowerCase() + "\" ;;\n" +
                                    " } \n"
                                    ;
                            default: // default as uint256
                                return  " dimension: logged_"+ inp.name.toLowerCase() + " { \n " +
                                    " type: number\n" +
                                    " sql: ${TABLE}.\"logged_" + inp.name.toLowerCase() + "\" ;;\n" +
                                    " } \n"
                                    ;
                        }
                    }
                );

        const measurefields =
            inputs
                .map(
                    (inp)=>{
                        switch (inp.type) {
                            // "string" type: i.e. type address in function parameter
                            case "address":
                                return  " measure: distinct_logged_" + inp.name.toLowerCase() + " { \n " +
                                    " type: count_distinct\n  " +
                                    " hidden: yes \n " +
                                    " sql: ${logged_" + inp.name.toLowerCase() + "} ;; \n" +
                                    "  } \n" +
                                    " \n " +
                                    " measure: change_logged_" + inp.name.toLowerCase() + " { \n" +
                                    " type: percent_of_previous\n " +
                                    " hidden: yes \n " +
                                    " sql: ${distinct_logged_" + inp.name.toLowerCase() + "} ;; \n" +
                                    " } \n" +
                                    " \n " +
                                    " measure: list_logged_" + inp.name.toLowerCase() + " { \n " +
                                    " type: list \n " +
                                    " hidden: yes \n " +
                                    " list_field: logged_" + inp.name.toLowerCase() + " \n " +
                                    " }"
                                    ;
                            // "integer" type: i.e. type uint256 in function parameter (default)
                            default:
                                return  " measure: total_logged_" + inp.name.toLowerCase() + " { \n " +
                                    " type: sum\n" +
                                    " hidden: yes\n" +
                                    " sql: ${logged_" + inp.name.toLowerCase() + "} ;;\n" +
                                    " }\n" +
                                    "\n" +
                                    " measure: avg_logged_" + inp.name.toLowerCase() + " { \n " +
                                    " type: average\n" +
                                    " hidden: yes\n" +
                                    " sql: ${logged_" + inp.name.toLowerCase() + "} ;; \n " +
                                    " }\n" +
                                    "\n" +
                                    " measure: running_total_logged_" + inp.name.toLowerCase() + " { \n " +
                                    " type: running_total\n" +
                                    " hidden: yes\n" +
                                    " sql: ${logged_" + inp.name.toLowerCase() + "} ;; \n " +
                                    " }\n" +
                                    "\n" +
                                    " measure: change_logged_" + inp.name.toLowerCase() + " { \n " +
                                    " type: percent_of_previous\n" +
                                    " hidden: yes\n" +
                                    " sql: ${total_logged_" + inp.name.toLowerCase() + "} ;; \n " +
                                    " }"
                                    ;
                        }
                    }
                );

        return (
            <pre>
          view: {viewname} {" { "} <br/>
                {/*  -----------  DERIVED TABLE: START  ----------  */}
                dervied_table: {" { "} <br/>
          sql: <br/>
          SELECT <br/>
                {"    e.block_signed_at,"} <br/>
                {"    e.block_height,"} <br/>
                {"    '0x' || encode(e.tx_hash, 'hex') AS tx_hash,"} <br/>
                {"    " + ifields.join(", \n    ")} {datafields.length > 0 ? "," : ""}   <br/>
                {"    " + datafields.join(", \n    ")} <br/>
          FROM {this.state.chain_name}.block_log_events e <br/>
          WHERE <br/>
                {"    "} e.sender = {"'\\x" + this.state.address_input.substr(2) + "'"} <br/>
                {"    "} AND e.topics[1] = {"'\\x" + s.substr(2) + "'"} <br/>
                {" } "} <br/>
                {/*  -----------  DERIVED TABLE: END  ----------  */}
                <br/>
                {/*  -----------  DIMENSIONS: HARD-CODED START  ----------  */}
                dimension: tx_hash { "{" }  <br/>
          type:  string  <br/>
          sql: {" ${TABLE}.\"tx_hash\" ;; "}  <br/>
                { "}" }  <br/>
          <br/>
          dimension_group: block_signed_at { "{" }  <br/>
          type: time <br/>
          timeframes: [date, week, month, quarter, year] <br/>
          sql: {" ${TABLE}.\"block_signed_at\" ;; "}  <br/>
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
            fetch(
                `https://api.covalenthq.com/v1/${this.state.chain_id}/events/address/` + this.state.address_input +
                "/abi/?&key=ckey_4d5b231f1a584413ae6c3715bcf")
                .then(response => response.json())
                .then((data)=> {
                    if(data.data.items.length === 0) {
                        this.setState({
                            error: true,
                            error_message: "Invalid contract address!"
                        });
                    }
                    else {
                        this.setState({
                            events: data, //data
                            error: false
                        });
                    }
                }).catch((err) => {
                console.log(err + " thrown out when fetching the API!");
            })
        } else {
            this.setState({
                error: true,
                error_message: "Contract address shorter than expected!"
            });
        }
    }

    _copyFunction = (a,b,c) => {
        // console.log(a); //a is result
        // console.log(b); //topic hash
        let textArray = a.props.children;
        let bigStr = "";
        for (let x of textArray){
            if (typeof x === 'string' || x instanceof String) {
                if (x.length !== 0) {
                    bigStr += x;
                }
            }
            else {
                bigStr += "\n";
            }
        }

        let aa = document.getElementsByClassName("buttonW");
        for (let item of aa){
            if (item.id === b){
                document.getElementById(b).innerText = "Copied!";
            }
            else{}
        }
        this.copyToClipboard(bigStr);
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

    _inputAddress = (e) => {
        this.setState({
            //under setState, can just set one field
            //e here is the value when calling this function
            //when setState is called, calling render function again
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
                {this.state.all_chains_data.length !== 0 ? <div>

                    <p>Enter the contract address:</p>
                    <input placeholder="Contract address"
                           value={this.state.address_input}
                           onChange={this._inputAddress}
                           style={{marginRight: "1rem", border: "none"}}
                    />

                    <select style={{marginRight: "1rem", height: 39}} onChange={this._inputChainId}>
                        {this.state.all_chains_data.map(o => this._renderOptions(o.db_schema_name, o.label, o.chain_id))}
                    </select>

                    <button onClick={this._clickNext} >Get event LookML!</button>
                </div> : null}

                {err}

                {this.state.error?" Try to enter it again. ":(this._renderEvents())}
            </div>
        );
    }
}

export default (props) => {
    return (
        <LookMLApp />
    )
}
