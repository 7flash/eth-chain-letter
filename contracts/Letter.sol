pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol";
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721MetadataMintable.sol';

contract Letter is ERC721, ERC721Enumerable, ERC721Metadata, ERC721MetadataMintable {
    constructor() ERC721Metadata("Letter", "LTR") public {
    }

    function revealMessage(address to, bytes32 hash, string memory message)
        public onlyMinter returns (bool)
    {
        return mintWithTokenURI(to, uint256(hash), message);
    }

    function getTokens(address owner)
        public view returns (uint256[] memory)
    {
        return _tokensOfOwner(owner);
    }
}
