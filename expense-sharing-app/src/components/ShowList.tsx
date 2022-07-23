import React, { Component } from "react";
import IDataList from '../model/InterfaceDataList'
import { getDataFromServer, pushDataToServer } from '../service/method'
import ExpenseTracker from './ExpenseTracker'

type Props = {

}
type State = {
    items: IDataList[],
    error?: Error| null,
    sum: number,
    rahulspent: number,
    rameshspent: number,
    showform: boolean
    
}

class ShowData extends Component<Props, State>{

    constructor(props: Props)
    {
        console.log("constructor called");
        super(props);
        this.state = {
            items: [],
            error: null,
            sum: 0,
            rahulspent: 0,
            rameshspent: 0,
            showform: false 
        }
    }

    rahulspent1 : number = 0
    rameshspent1 : number = 0

    async fetchData(){
        try{
        const data = await getDataFromServer()
        
        this.setState({
            items: data,
            sum: data.reduce((result,v) =>  result = result + v.price , 0 )
        })
        this.shares(data)
    }
    catch (errorObj : any) {
        this.setState({error: errorObj})
    }
    }

    componentDidMount() {
        console.log("didMount called");
        this.fetchData();
        
      };

    componentDidUpdate(prevProps : Props, prevState : State)
    {
        this.rahulspent1 = 0
        this.rameshspent1 = 0

        if(prevState.showform !== this.state.showform)
        {
            console.log("didupdate called");
            this.fetchData();
        }
    }

    shares = (data :IDataList[]) =>{
    
        data.map(
            sams => (
                sams.payeeName === "Rahul" ? (
                    this.rahulspent1 = this.rahulspent1 + sams.price
                ):
                (
                    this.rameshspent1 = this.rameshspent1 + sams.price
                )
            )
        )
        this.setState({
            rahulspent: this.rahulspent1,
            rameshspent: this.rameshspent1
        })
    }

    success =() => {
        this.setState({showform: false})
    }
    cancel = () => {
        this.setState({showform: false})
    }


    render() {
        console.log("render called");
        const el = (
            <>
                <header id="page-Header">Expense Tracker</header>
                <button id="Add-Button" onClick={() => {this.setState({showform: true})}}>Add</button>
                {
                    this.state.showform && (
                        <div className="form">
                            <ExpenseTracker onTrue={this.success} onClose={this.cancel}/>
                        </div>
                    ) 
                }
                <>
                    <div className="use-inline date header-color">Date</div>
                    <div className="use-inline header-color">Product Purchased</div>
                    <div className="use-inline price header-color">Price</div>
                    <div className="use-inline header-color" style={{width: 112}}>Payee</div>
                </>
                {
                    this.state.items && (
                        this.state.items.map (
                            (user, idx) =>(
                                <div key={idx}>
                                    <div className="use-inline date">{user.setDate}</div>
                                    <div className="use-inline">{user.product}</div>
                                    <div className="use-inline price">{user.price}</div>
                                    <div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
                                </div>
                            )
                        )
                    )
                }
                <hr />

                <div className="use-inline ">Total: </div>
                <span className="use-inline total">{this.state.sum}</span> <br />
                <div className="use-inline ">Rahul paid: </div>
                <span className="use-inline total Rahul">{this.state.rahulspent}</span> <br />
                <div className="use-inline ">Ramesh paid: </div>
                <span className="use-inline total Ramesh">{this.state.rameshspent}</span> <br />
                <span className="use-inline payable">{(this.state.rahulspent > this.state.rameshspent)? "Pay Rahul " : "Pay Ramesh"}</span>
                <span className="use-inline payable price">{Math.abs((this.state.rahulspent-this.state.rameshspent)/2)}</span>

                {

                   this.state.error && (
                        <div>
                            {this.state.error?.message}
                        </div>
                    )
                }
                
                
            </>
        )

        return el;
}

}
export default ShowData
