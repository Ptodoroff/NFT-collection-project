const {ethers} = require ("hardhat");         // adding the ethers.js library provided by hardhat;

async function main() {                       // deployment code is contained here

  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldCollection");  // this ethers.js method gets my compiled contract that I will deploy
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorldCollection",
   "SMWC",
   "https://ipfs.io/ipfs/QmYQ8Pznptz5LPpC6baXeqDb3taESkKv3waMCRr8hGq649/"
   ); 
   // this is deploying the contract. the arguments in the brackets are the one, required by the contract's constructor PAY ATTENTION TO HOW I PASS THE STRING FOR THE TOKEN URI -  the uri is the uri of the folder 
   // FOOLOWED BY A BACKSLASH !!!!!! 

  await superMarioWorld.deployed();  //awaits for the contract to get deployed before doing anything further

  console.log("contract deployed to Mumbai at address:" + superMarioWorld.address);

  await superMarioWorld.mint(3)    //every time I call the function ,the tokenCount increments by one. i ahve 6 nfts - the first 3 are common and the next 3 are rare.
  await superMarioWorld.mint(3)     // ther only argument needed to get passed to the mint function is the amount of tokens thatI would like to get minted 
  await superMarioWorld.mint(3)
  await superMarioWorld.mint(1)
  await superMarioWorld.mint(1)
  await superMarioWorld.mint(1)


}       //braces!

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


