const dataModal=require("../modal/productModal")


// addData to data base (post)
 const addData=async (req,res)=>{
    try{
        var product_Data=dataModal({
            name:req.body.name,
            price: req.body.price,
            category: req.body.category,
            desc: req.body.desc
        })
        await product_Data.save()
        res.status(200).send("data is added")
    }
    catch (err){
        res.status(500).send(`error name:${err.name}, error message:${err.message}`)

    }
 }
// getData to data base (get)

 const getData=async(req,res)=>{
    try{
        const getProduct=await dataModal.find()
        res.status(200).send(getProduct)
    }
    catch (err){
         res.status(404).send(`error name:${err.name}, error message:${err.message}`)
    }
 }

// updateData to data base (put)
// Model.findByIdAndUpdate(id, updateData, options)
// {new:true} ==> for updated data
const updateData=async()=>{
    try{
        const updateProduct=await dataModal.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).send("Data Update")
    }
     catch (err){
         res.status(404).send(`error name:${err.name}, error message:${err.message}`)
    }
}

// deleteData to database (delete)

const deleteData=async(req,res)=>{
    try{
        const deleteProduct=await dataModal.findByIdAndDelete(req.params.id)
        res.status(200).send({message: "Deleted successfully"})
    }
    catch(err){
         res.status(404).send(`error name:${err.name}, error message:${err.message}`)
    }
}


module.exports={addData,getData,updateData,deleteData}









