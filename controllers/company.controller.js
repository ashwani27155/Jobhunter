const Company=require('../models/company.model');
const mongoose=require('mongoose');
const constant=require('../utils/constants');
exports.createCompany= async(req,res)=>{
    const companyObjToBeStoredInDB={
        name:req.body.name,
        address:req.body.address,
        jobsPosted: []
       
    }
   /** Insert this new user to the database for this we need user model so we require user model*/
  try{
    const companyCreated=await Company.create("Company",companyObjToBeStoredInDB)//create user inside mondodb and wait until user is created so we use await keyword
    console.log(companyCreated)
    /** Return the response using the object: userCreated */
    
    res.status(201).send(companyCreated)
  }catch(err){
    console.error("Error while creating new user",error.message);
    res.status(500).send({
        message:"Some internal error while creating new company"
    })
  }
}
exports.updateCompany=async (req,res)=>{
    //check if the ticket exists
    const company=await Company.findOne({
        _id:req.params.id
    });
    if(company==null){
        return res.status(200).send({
            message:"company doesn't exist"
        })
    }
    //update the attribute of the saved company
    company.name = req.body.name != undefined ? req.body.name : company.name;
    company.address = req.body.address != undefined ? req.body.address : company.address;
    company.verified = req.body.verified != undefined ? req.body.verified : company.verified;
  
    //saved the changed company
    const updatedCompany = await company.save();
    //return the updated company
    return res.status(200).send(updatedCompany);
}
// delete the company
exports.deleteCompany=async (req,res)=>{
    try{
        const company= await Company.deleteOne({_id:req.param.id});
        res.status(200).send({
            message:"Company deleted successfully ",company
        })
    }catch(err){
        console.log("error while deleting the company",err.message);
        res.status(400).send({
            message:"error while deleting the company"
        })
    }
}
//search company
exports.searchCompany=async(req,res)=>{
        const companies= await Company.find();
        res.status(200).send(companies)
    
}
//search company by its id
exports.searchOneCompany=async(req,res)=>{
    try{
        const company= await Company.findOne({_id:req.params.id});
        if(company==null){
            res.status(200).send({
                message:"Company with given id does not exits"
            })
        }
        res.status(200).send(company)
    }catch(err){
        console.log("Error while fetching the company",error.message);
        res.status(400).send({
            message:"Error while fetching the company"
        })
    }
}

