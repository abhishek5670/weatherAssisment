import { apiCall } from "./core"

const apiURl = process.env.REACT_APP_API_URL

export const currentDay=async(params)=>{
    try {
        const url=`${apiURl}/forecast.json`
        const response = await apiCall(url,params)
        return response
    } catch (error) {
        console.error(error)
    }
}