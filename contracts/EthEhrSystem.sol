pragma solidity ^0.5.0;

contract EthEhrSystem {
	uint public recordCount = 0;

	struct Record {
		uint id;
		string firstName;
		string lastName;
		bool completed;

	}



	mapping(uint => Record) public records;

	constructor() public {
		createRecord("Test", "Other Test");
	}

	function createRecord(string memory _firstName, string memory _lastName) public {
		recordCount ++;
		records[recordCount] = Record(recordCount, _firstName, _lastName, false); 
	}

}