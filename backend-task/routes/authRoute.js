const express = require("express");
const {registerUser,loginUser,} = require("../controllers/authController");
const {createCountry, getAllCountries, getCountryById, updateCountryById, deleteCountryById} = require("../controllers/countryController")
const {createState, getAllStates, getStateById, getStatesByCountryId ,updateStatesById, deleteStateById} = require('../controllers/stateController')
const {createDistrict, getAllDistricts, getDistrictById, updateDistrictById, deleteDistrictById} = require('../controllers/districtController')
const {createTaluk, getAllTaluks, getTalukById, getDistrictsByStateId, updateTalukById, deleteTalukById} = require('../controllers/talukController')
const {authenticateUser} = require('../middlewares/authMiddleware')
const {roleMiddleware} = require('../middlewares/roleMiddleware')
const app = express();


app.use(express.json()); 
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/createcountry",authenticateUser, roleMiddleware(["admin"]),createCountry );
router.post("/getallcountry",authenticateUser, roleMiddleware(["admin","manager","user"]),getAllCountries);
router.post("/getcountrybyid/:countryId",authenticateUser, roleMiddleware(["admin","manager"]),getCountryById);
router.post("/updatecountry/:countryId",authenticateUser, roleMiddleware(["admin","manager"]),updateCountryById);
router.post("/deletecountry/:countryId",authenticateUser, roleMiddleware("admin"),deleteCountryById);

router.post("/createstate/:countryId",authenticateUser, roleMiddleware("admin"),createState);
router.post("/getallstate",authenticateUser, roleMiddleware(["admin","manager","user"]),getAllStates);
router.post("/getstatebyid/:stateId",authenticateUser, roleMiddleware(["admin","manager"]),getStateById);
router.post("/getstatebycountryid/:countryId",authenticateUser,roleMiddleware(["admin","manager","user"]),getStatesByCountryId);
router.post("/updatestate/:stateId",authenticateUser, roleMiddleware(["admin","manager"]),updateStatesById);
router.post("/deletestate/:stateId",authenticateUser, roleMiddleware("admin"),deleteStateById);

router.post("/createdistrict/:countryId/:stateId",authenticateUser, roleMiddleware("admin"),createDistrict);
router.post("/getalldistrict",authenticateUser, roleMiddleware(["admin","manager","user"]),getAllDistricts);
router.post("/getdistrictbyid/:districtId",authenticateUser, roleMiddleware(["admin","manager"]),getDistrictById);
router.post("/updatedistrict/:districtId",authenticateUser, roleMiddleware(["admin","manager"]),updateDistrictById);
router.post("/deletedistrict/:districtId",authenticateUser, roleMiddleware("admin"),deleteDistrictById);

router.post("/createtaluk/:countryId/:stateId/:districtId",authenticateUser, roleMiddleware("admin"),createTaluk);
router.post("/getalltaluk",authenticateUser, roleMiddleware(["admin","manager","user"]),getAllTaluks);
router.post("/gettalukbyid/:talukId",authenticateUser, roleMiddleware(["admin","manager"]),getTalukById);
router.post("/getdistrictbystate/:stateId",authenticateUser,roleMiddleware(["admin","manager"]),getDistrictsByStateId);
router.post("/updatetaluk/:talukId",authenticateUser, roleMiddleware("admin","manager"),updateTalukById);
router.post("/deletetaluk/:talukId",authenticateUser, roleMiddleware("admin"),deleteTalukById);


module.exports = router;
