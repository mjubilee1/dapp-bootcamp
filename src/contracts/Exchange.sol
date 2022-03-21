// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import './Token.sol';

// TODO:
// [X] Set the fee account
// [X] Deposit Ether
// [X] Withdraw Ether
// [X] Deposit tokens
// [] Withdraw tokens
// [X] Check balances
// [] Make order
// [] Cancel order
// [] Fill order

contract Exchange {
	address public feeAccount; // the account that receives exchange fees
	address constant ETHER = address(0); // store Ether in tokens mapping with blank address
	uint256 public feePercent; // the fee percentage
	mapping(address => mapping(address => uint256)) public tokens;

	event Deposit(address token, address user, uint256 amount, uint256 balance);
	event Withdraw(address token, address user, uint256 amount, uint256 balance);

	constructor(address _feeAccount, uint256 _feePercent) {
		feeAccount = _feeAccount;
		feePercent = _feePercent;
	}

	// Fallback: reverts if Ether is sent to this smart contract by mistake
	fallback() external {
		revert();
	}

	function depositEther() payable public {
		tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender] + msg.value;
		emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
	}

	function withdrawEther(uint256 _amount) public {
		require(tokens[ETHER][msg.sender] >= _amount);
		tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender] - _amount;
		payable(msg.sender).transfer(_amount);
		emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
	}

	function depositToken(address _token, uint256 _amount) public {
		require(_token != ETHER);
		require(Token(_token).transferFrom(msg.sender, address(this), _amount));
		tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;
		emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function withdrawToken(address _token, uint256 _amount) public {
		require(_token != ETHER);
		require(tokens[_token][msg.sender] >= _amount);
		tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;
		require(Token(_token).transfer(msg.sender, _amount));
		emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function balanceOf(address _token, address _user) public view returns (uint256) {
		return tokens[_token][_user];
	}
}