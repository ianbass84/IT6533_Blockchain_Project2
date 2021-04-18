pragma solidity ^0.5.0;

contract EthEhrSystem {
	uint public recordCount = 0;

	struct Record {
		uint id;
		string firstName;
		string lastName;
		string addressed;
		string city;
		string state;
		string zip;
		string phone;
		

	}



	mapping(uint => Record) public records;

	constructor() public {
		createRecord("John", "Smith", "123 green street", "smithville", "Ga", "123456", "1234567890");
	}

	function createRecord(string memory _firstName, string memory _lastName, string memory _addressed, string memory _city, string memory _state, string memory _zip, string memory _phone) public {
		recordCount ++;
		records[recordCount] = Record(recordCount, _firstName, _lastName, _addressed, _city, _state, _zip, _phone); 
	}

}