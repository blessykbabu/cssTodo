import schema from './task.model.js';

export async function addData(req,res)
{
    try {
        const {task,date,status}=req.body;
        console.log(task , date , status);
        res.status(201).send(schema.create({task,date,status}))
    } catch (error) {
        res.status(404).send(error)
    }
}

export async function getData(req,res)
{
    const data = await schema.find();
    res.status(200).send(data)
}
export async function deleteTask(req,res)
{
    const {id}=req.params;
    try {
        await schema.deleteOne({_id:id})
        res.status(200).send('deleted')
    } catch (error) {
        res.status(404).send('error')
    }
    console.log(id);
}
export async function editTask(req,res)
{
    const {id}=req.params;
    const {task,date,status}=req.body;
    console.log(task,date);
    try {
        const data=await schema.updateOne({_id:id},{$set :{task,date,status}})
        res.status(200).send('updated')
    } catch (error) {
        res.status(404).send(error) 
    }
}