/**
 * This file will act as the route for authentication and authorzation
 * 
 */

// define the routes - REST endpoints for user registration
const companyController = require("../controllers/company.controller")
const {auth} = require("../middleware/");

module.exports = (app)=>{
    
    // CREATE CALL
    app.post("/jobhunters/app/v1/companies", [auth.verifyToken, auth.isAdminOrRecruiter], companyController.createCompany);

    // UPDATE CALL
    app.put("/jobhunters/app/v1/companies/:id", [auth.verifyToken, auth.isAdminOrRecruiter], companyController.updateCompany);

    // DELETE CALL
    app.delete("/jobhunters/app/v1/companies/:id", [auth.verifyToken, auth.isAdminOrRecruiter], companyController.deleteCompany);
    
    // GET ALL COMPANIES
    app.get("/jobhunters/app/v1/companies", [auth.verifyToken], companyController.searchCompany);
    
    // GET SINGLE COMPANY
    app.get("/jobhunters/app/v1/companies/:id", [auth.verifyToken], companyController.searchOneCompany);

}