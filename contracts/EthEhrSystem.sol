pragma solidity ^0.5.0;

contract EthEhrSystem {
	uint public recordCount = 0;

	struct Record {
		uint id;
		string firstName;
		string lastName;
		string gender;
		string encounterType;
		string note;
		string cpt;
		string dxCode;
	}



	mapping(uint => Record) public records;

	event RecordCreated(
		uint id,
		string firstName,
		string lastName,
		string gender,
		string encounterType,
		string note,
		string cpt,
		string dxCode
	);

	constructor() public {
		createRecord("John", "Smith", "Male","ER Visit","Test2", "29824","S53.145A");
	}

	function createRecord(string memory _firstName, string memory _lastName, string memory _gender, string memory _encounterType, string memory _note, string memory _cpt, string memory _dxCode) public {
		recordCount ++;
		records[recordCount] = Record(recordCount, _firstName, _lastName, _gender, _encounterType, _note, _cpt, _dxCode);
		emit RecordCreated(recordCount, _firstName, _lastName, _gender, _encounterType, _note, _cpt, _dxCode);
	}

}