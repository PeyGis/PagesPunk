// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract RoboPunkNFT is ERC721, Ownable{
    uint256 public mint_price;
    uint256 public total_supply;
    uint256 public max_supply;
    uint256 public max_per_wallet;
    bool public is_mint_enabled;
    string internal baseURI;
    address payable public withdraw_wallet;
    mapping (address => uint256) public wallet_mints;


    constructor() payable ERC721('RoboPunks', 'ROBO'){
        mint_price = 0.02 ether;
        total_supply = 0;
        max_supply = 1000;
        max_per_wallet = 3;
    }

    function enable_public_mint(bool _status) external onlyOwner {
        is_mint_enabled = _status;
    }
    function set_base_token_uri(string calldata uri) external onlyOwner{
        baseURI = uri;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exists');
        return string(abi.encodePacked(baseURI, Strings.toString(tokenId_), ".json"));        
    }
    
    function withdraw() external onlyOwner{
        (bool success, ) = withdraw_wallet.call{value: address(this).balance}('');
        require(success, "withdraw failed");
    }

    function mint(uint256 quantity) payable public {
        require(is_mint_enabled, "NFT not open for public yet");
        require(msg.value == quantity * mint_price, "insufficient amount passed");
        require(total_supply + quantity <= max_supply, "Sold out");
        require(wallet_mints[msg.sender] + quantity <= max_per_wallet, "Maximum per wallet reached");

        //now mint for user
        for(uint256 i=0; i < quantity; i++){
            uint256 new_token_id = total_supply +1;
            total_supply++;
            _safeMint(msg.sender, new_token_id);
        }
        
    }
}