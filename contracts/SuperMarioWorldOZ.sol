// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SuperMarioWorldOZ is ERC721URIStorage {
    using Counters for Counters.Counter;                //increments,decrements or resets a value. Used here to increment the tokenCounter
    Counters.Counter private _tokenIds;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}      // passing the constructor arguments of the SuperMarioWorld constructor to the ERC721 constructor. Note- this ERC721 contract is the imported one from OZ, not the one that I created.

    function mint (string memory tokenURI)         //this function is originally named awardItem by the OpenZeppelin staff. But it is pretty much nothing different than a normal minting function so I rename it 
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }
}