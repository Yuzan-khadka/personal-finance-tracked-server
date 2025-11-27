import express, {type Request, type Response} from 'express';
import FinancialRecordModel from '../model/financial-record.ts';


const router = express.Router();

//get record by id
router.get('/getAllByUserID/:userId', async(req: Request, res: Response) => {

    try{
        const userId = req.params.userId;

        if(!userId){
            return res.status(400).send("UserId is required.");
        }
        const records = await FinancialRecordModel.find({userId: userId});
        if(records.length == 0){
            return res.status(404).send("No records found for the user.");
        }
        res.status(200).send(records);

    }catch(err){ 
        res.status(500).send(err);
    }
})

//add new record
router.post('/addRecord', async (req:Request, res: Response) => {
   
    const newRecord = new FinancialRecordModel({
   userId: req.body.userId,
   date: req.body.date,
   description: req.body.description,
   amount: req.body.amount,
   category: req.body.category,
   paymentMethod: req.body.paymentMethod,
} );
    try{

        const savedRecord = await newRecord.save();

        res.status(200).json({message: "Record created successfully!!", data: savedRecord});
     

    }catch(error: unknown){

         if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
       
        return res.status(400).json({message: "An unexpected server error occurred"});

    }
});

// update by id
router.put('/updateRecord/:id', async(req:Request, res:Response) => {

    try{
        const id = req.params.id;
        const newRecord = req.body; 
        const options = { new: true };

        const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(id, newRecord, options);
        
        if(!updatedRecord){
            return res.status(404).send();
        }
        res.status(200).send(updatedRecord);


    }catch(err){
        res.status(500).send(err);
    }

});


// delete by id
router.delete('/deleteRecord/:id', async(req:Request, res:Response) => {

    try{
        const id = req.params.id;

        const deleteRecord = await FinancialRecordModel.findByIdAndDelete(id);
        
        if(!deleteRecord){
            return res.status(404).send();
        }
        res.status(200).send({message: "The record has been deleted!!", data: deleteRecord});


    }catch(err){
        res.status(500).send(err);
    }

})

export default router;