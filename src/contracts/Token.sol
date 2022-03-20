// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Token {
  string public name = 'Test Token';
	string public symbol = 'TA';
	uint256 public decimals = 18;
	uint public totalSupply;
	mapping(address => uint256) public balanceOf;


	event Transfer(address indexed from, address indexed to, uint256 value);

	constructor() {
		totalSupply = 1000000 * (10 ** decimals);
		balanceOf[msg.sender] = totalSupply;
	}

	function transfer(address _to, uint256 _value) public returns (bool success) {
		require(_to != address(0));
		require(balanceOf[msg.sender] >= _value);
		balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
		balanceOf[_to] = balanceOf[_to] + _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}
}
