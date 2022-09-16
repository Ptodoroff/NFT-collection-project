pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SuperMarioWorldCollection is ERC1155, Ownable {
    string public name;
    string public symbol;
    uint public tokenCount;
    string public baseUri;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseUri
    ) ERC1155(_baseUri) {
        name = _name;
        symbol = _symbol;
        baseUri = _baseUri;
    }

    function mint (uint _amount) public onlyOwner {
        tokenCount +=1;
        _mint(msg.sender,tokenCount,_amount, "");           //internal function provided by the OZ erc1155 and erc721. the last argument is the "bytes data" , which is an optional one, so i pass it an empty string
    }


    //we need to  override the uri function form the oz erc 1155 interface, because it is structuring the uri link differently 
    //the uri function involves string concatenation, this is why I imported the Strings.sol contract from oz
    // the uri function take an url, adds a token id and adds a .json extension. something like  URL/tokenId.json

    function uri (uint tokenId) public view override returns (string memory) {
        return string ( abi.encodePacked(
            baseUri,
            Strings.toString(tokenId),  
            ".json")
        );

    }


}
