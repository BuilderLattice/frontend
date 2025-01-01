// SPDX-License-Identifier: MIT
// Unpublished Contract
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BuilderLatticeToken
 * @notice ERC20 token for the BuilderLattice platform
 */
contract BuilderLatticeToken is ERC20, Ownable {
    constructor() ERC20("Builder Lattice Token", "BLT") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

/**
 * @title BuilderLattice
 * @author BuilderLattice
 * @notice Contract that stores hash and compatibility of builders with token distribution
 */
contract BuilderLattice {
    struct User {
        address userAddress;
        string dataHash;
        uint256 joinTimestamp; // Added to track user joining time
    }

    struct Match {
        address userAddress;
        string name;
        string bio;
        uint64 devScore;
        uint64 compatibilityScore;
        string remark;
    }

    uint64 public constant PREMIUM_FEE = 0.001 ether;
    uint256 public constant TOKENS_PER_PREMIUM = 100 * 10**18; // 100 BLT tokens per premium payment
    
    User[] internal usersArray;
    mapping(address => User) internal users;
    mapping(address => Match[]) public matches;
    mapping(address => bool) public hasPaid;
    
    BuilderLatticeToken public bltToken;
    
    event PremiumPaid(address user, uint256 amount);
    event TokensDistributed(uint256 totalDistributed, uint256 usersCount);

    constructor() {
        bltToken = new BuilderLatticeToken();
    }

    /**
     * @notice Pay the premium for exporting data and distribute tokens
     */
    function payPremiumForExport() public payable {
        require(msg.value >= PREMIUM_FEE, "Not enough funds");
        require(!hasPaid[msg.sender], "Already paid premium");
        hasPaid[msg.sender] = true;

        // Mint new BLT tokens for this premium payment
        bltToken.mint(address(this), TOKENS_PER_PREMIUM);
        
        // Distribute the premium payment to existing users
        distributePayment();
        
        emit PremiumPaid(msg.sender, msg.value);
    }

    /**
     * @notice Distributes the premium payment equally among existing users
     */
    function distributePayment() internal {
        uint256 userCount = usersArray.length;
        require(userCount > 0, "No users to distribute to");

        uint256 ethPerUser = msg.value / userCount;
        uint256 tokensPerUser = TOKENS_PER_PREMIUM / userCount;

        for (uint256 i = 0; i < userCount; i++) {
            address userAddress = usersArray[i].userAddress;
            
            // Transfer ETH share
            (bool success, ) = userAddress.call{value: ethPerUser}("");
            require(success, "ETH transfer failed");
            
            // Transfer BLT tokens
            bltToken.transfer(userAddress, tokensPerUser);
        }

        emit TokensDistributed(TOKENS_PER_PREMIUM, userCount);
    }

    /**
     * @notice Creates a new user in this contract
     * @param _dataHash Hash of the data for the user
     */
    function createUser(string memory _dataHash) public {
        require(users[msg.sender].userAddress == address(0), "User already exists");
        User memory _user = User(msg.sender, _dataHash, block.timestamp);
        users[msg.sender] = _user;
        usersArray.push(_user);
    }

    /**
     * @notice Returns a user struct.
     * @param _addr Address of the user.
     */
    function getUser(address _addr) public view returns (User memory) {
        require(users[_addr].userAddress != address(0), "User doesn't exist");
        return users[_addr];
    }

    /**
     * @notice Returns an array of all users.
     * @notice Caller must have called payPremiumForExport or should have an existing profile
     * before calling this function.
     */
    function getAllUsers() public view returns (User[] memory) {
        require(
            (hasPaid[msg.sender] == true) ||
                (users[msg.sender].userAddress == msg.sender),
            "Not paid yet or no profile yet."
        );
        return usersArray;
    }

    /**
     * @notice Returns an array of selected users.
     * @param _usersAddresses Addresses of the users as an array.
     */
    function getSelectedUsers(
        address[] memory _usersAddresses
    ) public view returns (User[] memory) {
        uint256 length = _usersAddresses.length;
        User[] memory arr = new User[](length);
        for (uint256 i = 0; i < length; i++) {
            arr[i] = users[_usersAddresses[i]];
        }
        return arr;
    }

     /**
     * @notice Updates data hash for a user(msg.sender).
     * @param _dataHash Hash of the data for the user.
     */
    function updateDataHash(string memory _dataHash) public {
        require(
            users[msg.sender].userAddress == msg.sender,
            "You are not the owner of this profile"
        );
        users[msg.sender].dataHash = _dataHash;
    }

     /**
     * @notice Returns an array of matches for a user.
     * @param _user Address of the user.
     */
    function getUserMatches(
        address _user
    ) public view returns (Match[] memory) {
        return matches[_user];
    }
    

    /**
     * @notice Edits the compatibilityScore and match between two users, unit transaction, not as an array.
     * @param userMatch the match of a user to be added.
     */
    function addMatch(
        address user,
        Match memory userMatch
    ) public {
        matches[user].push(Match(userMatch.userAddress, userMatch.name, userMatch.bio, userMatch.devScore, userMatch.compatibilityScore, userMatch.remark));
    }

    /**
     * @notice Updates the matches of an user, taking in an array of match addresses.
     * @param _user Address of the user.
     * @param _matches Array of match addresses.
     */

    function addMatches(address _user, Match[] memory _matches) public {
        for (uint i = 0; i < _matches.length; i++) {
            addMatch(_user, _matches[i]);
        }
    }


    /**
     * @notice Get BLT token balance of an address
     * @param _address Address to check balance for
     */
    function getBLTBalance(address _address) public view returns (uint256) {
        return bltToken.balanceOf(_address);
    }

    /**
     * @notice Check if address is a registered user
     * @param _address Address to check
     */
    function isRegisteredUser(address _address) public view returns (bool) {
        return users[_address].userAddress != address(0);
    }
}
