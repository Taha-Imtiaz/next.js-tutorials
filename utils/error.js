import db from "./db"

export const getError = (error) => {
 return   error.response && error.response.data && error.response.data.message ? error.response.data.message  : error.message
}

export const onError = async (error, req, res, next) => {
    await db.disconnect()
    res.status(500).send({message: error.toString()})
} 