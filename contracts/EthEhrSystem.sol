pragma solidity ^0.5.0;

contract EthEhrSystem {
	uint public recordCount = 0;

	struct Record {
		uint id;
		string firstName;
		string lastName;
		string gender;

	}



	mapping(uint => Record) public records;

	event RecordCreated(
		uint id,
		string firstName,
		string lastName,
		string gender
	);

	constructor() public {
		createRecord("John", "Smith", "Male");
	}

	function createRecord(string memory _firstName, string memory _lastName, string memory _gender) public {
		recordCount ++;
		records[recordCount] = Record(recordCount, _firstName, _lastName, _gender);
		emit RecordCreated(recordCount, _firstName, _lastName, _gender);
	}

}