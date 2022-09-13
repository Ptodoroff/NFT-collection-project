require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();                   // we require this in orther to be able to make use of the .env file which stores the api key and the mnemonic phrase. the .env file must be created in the root of the project

//DONT FORGET TO NPM INSTALL THE DOTENV !!!



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    mumbai: {
      url:process.env.MUMBAI_URL,                              //api_key for accessing the mumbai network
      accounts:[process.env.PRIVATE_KEY]                                  //mnemonic phrase or private key  of the deployer wallet. It is enclosed in [] brackets here !!!! also: THE KEY NAME IS accountS with S in the end !!!!!
    }
  }
};
