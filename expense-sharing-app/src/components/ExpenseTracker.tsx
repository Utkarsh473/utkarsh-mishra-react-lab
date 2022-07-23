import React, { ChangeEvent, useState, FormEvent } from "react";
import IDataList from "../model/InterfaceDataList";
import { pushDataToServer } from "../service/method";

type FunctionProps = {
    onTrue: any
    onClose: any
}



const ExpenseTracker = function(props: FunctionProps){

    const setDefaultDate = () => {
        const today = new Date();
        return today.getFullYear() + '-' + ('0'+(today.getMonth()+1)).slice(-2) + '-' + ('0'+today.getDate()).slice(-2)
    }


    const [payeeName, setPayeeName] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [product, setProduct] = useState<string>("")
    const [setDate, setLoggedDate] = useState<string>(setDefaultDate)

    const submitHandler = async (event : FormEvent<HTMLFormElement>) =>{
        event?.preventDefault()
        // console.log(this.state)
        const finalData = {
            payeeName : payeeName,
            product : product,
            price : price,
            setDate : setDate
        }
        const data = await pushDataToServer(finalData)
        // console.log(data)
        props.onTrue()
    }

    const element =(
        <>
            <section>
                <header>
                    <h1>Add New Item</h1>
                    <p>Read the below instructions before proceeding:<br /> Make sure you fill all the fileds where * is provided</p>
                </header>
                <form onSubmit={submitHandler}>
                    <article>
                        <p>Name</p>
                        <select name="Name" id="district" required value={payeeName} onChange={(event:ChangeEvent<HTMLSelectElement>)=> setPayeeName(event.target.value)}>
                            <option value="" defaultChecked>Choose</option>
                            <option value="Rahul">Rahul</option>
                            <option value="Ramesh">Ramesh</option>
                        </select>
                    </article>
                    
                    <article>
                        <p>Product purchased</p>
                        <input type="text" required  value={product} onChange={(event: ChangeEvent<HTMLInputElement>)=> setProduct(event.target.value)}/>
                    </article>

                    <article>
                        <p>Price</p>
                        <input type="number" required value={price} onChange={(event: ChangeEvent<HTMLInputElement>)=> setPrice(parseInt(event.target.value))}/>
                    </article>

                    <article>
                        <p>Date</p>
                        <input type="date" required value={setDate} onChange={(event: ChangeEvent<HTMLInputElement>)=> setLoggedDate(event.target.value)}/>
                    </article>

                    <button type="button" className="form-button" onClick={props.onClose}>Close</button>
                    {/* <button>Reset</button> */}
                    <button className="form-button">Submit</button>
                </form>
            </section>
        </>
    )

    return element

    


}

export default ExpenseTracker;