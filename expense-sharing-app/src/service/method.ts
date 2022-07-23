import React from "react";
import axios from "axios";
import IDataList from "../model/InterfaceDataList";


const getDataFromServer = () => {
    return axios.get<IDataList[]>('http://localhost:3001/items')
    .then(response => response.data)
    
}

const pushDataToServer = (newpurchase : Omit<IDataList, 'id'>) => {
    console.log(newpurchase)
    return axios.post<IDataList>(`http://localhost:3001/items`,
        newpurchase,
        {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        )
        .then(response => {return response.data})
        .catch(error => console.log(error.response.data))
}

export {
    getDataFromServer,
    pushDataToServer
}

