pragma solidity 0.8.9;

import "./ERC721.sol";

contract SuperMarioWorld is ERC721 {

    string public name;          // NFT metadata 
    string public symbol;        //NFT metadata 
    uint public tokenCount;

    mapping (uint => string) private tokenURIs;

    constructor (string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;

    }
   

    //returns an URI - the url that points to the metadata. NFT marketplaces call this function in order to retrieve the nft information 
    function tokenURI (uint _tokenId) public  view returns (string memory ) {       // NFT metadata 
        require( _owners[_tokenId]!=address(0), "Token does not exist");
        return tokenURIs[_tokenId];
    }

    function mint (string memory _tokenURI)  public  {
        tokenCount += 1;                                // increments the counter, used forsetting the tokenId
        _balances[msg.sender] +=1;                      
        _owners[tokenCount] = msg.sender;
        tokenURIs[tokenCount] = _tokenURI;           //sets the token URI in the metadata of the minted NFT to the URI that we pass as an input to this function 

        emit Transfer (address(0), msg.sender, tokenCount); // if the zero address is the "sender" of the NFT, this simply means that the event is a mint
    } 

    function supportsInterface (bytes4 interfaceId) public pure override returns (bool) {
        return interfaceId == 0x80ac58cd ||     interfaceId == 0x5b5e139f;                                // adding to check if the contract supports another interface( the one of the metadata) will greatly help Opensea in finding the NFT metadata and retireving it easier
    }

}