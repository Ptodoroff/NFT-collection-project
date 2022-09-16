pragma solidity 0.8.9;

import "./ERC1155.sol";

contract SuperMarioWorldERC1155 is ERC1155 {
    string public name;
    string public symbol;
    uint tokenCount;     //keeps track of the id that the nft will be given upon mint 

    mapping (uint => string ) private _tokenURIs;

    constructor (string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    //gets the uri link for the metadata of the queried nft
    function uri (uint tokenId) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }

    //mints the amount of the token with the corresponding id
    function mint (uint amount, string memory _uri) public {
        require (msg.sender != address(0), "Cannot mint to the zero address");
        tokenCount +=1;
        _balances[tokenCount][msg.sender] += amount;
        _tokenURIs[tokenCount]= _uri;               // sets the uri that has been passed as an input as the uri of the corresponding token ID

        emit  TransferSingle(msg.sender, (address(0)), msg.sender, tokenCount, amount);
    }

    function supportsInterface (bytes4 interfaceId) public pure override returns (bool){
    return interfaceId==0xd9b67a86 || interfaceId == 0x0e89341c;        // the second interface Id checks if we support uri function that retrieves the uri and (consequently ) the metadata, which helps the marketplace to visualise the nft easier
    }
}