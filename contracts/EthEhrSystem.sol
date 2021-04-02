pragma solidity ^0.5.0;

contract EthEhrSystem {
	uint public recordCount = 0;

	struct Record {
		uint id;
		string firstName;
		string lastName;

	}



	mapping(uint => Record) public records;

	event RecordCreated(
		uint id,
		string firstName,
		string lastName
	);

	constructor() public {
		createRecord("John", "Smith");
	}

	function createRecord(string memory _firstName, string memory _lastName) public {
		recordCount ++;
		records[recordCount] = Record(recordCount, _firstName, _lastName);
		emit RecordCreated(recordCount, _firstName, _lastName);
	}

}