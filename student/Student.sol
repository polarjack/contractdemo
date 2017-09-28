pragma solidity ^ 0.4.11;

contract Student {

    event StudentChange(address beforeStudent, address afterStudent, address changer);
    event VideoChange(address changer, bytes32 item, uint status);
    event CertificateChange(address changer, address item, uint status);

    //for identify creator
    modifier onlyOwner() {
        assert(creator == msg.sender);
        _;
    }
    //constructor 
    function Student(address input) public {
        creator = msg.sender;
        student = input;
        previous = input;
    }
    //video part
    function addVideo(bytes32 inputV) public {
        videos[inputV] = 1;
        savingVideos[indexV] = inputV;
        indexV++;
        VideoChange(msg.sender, inputV, 1);
    }
    function deleteVideo(bytes32 inputV) public {
        videos[inputV] = 0;
        VideoChange(msg.sender, inputV, 0);
    }
    function ifInside(bytes32 inputV) public constant returns(uint) {
        return videos[inputV];
    }
    //only creator and studnet can get the whole list
    function showAllVideos() public constant returns(bytes32[100]) {
        return savingVideos;
    }
    //certificates part
    function addCertificates(address input) public {
        certificates[input] = 1;
        savingCertificates[indexCer] = input;
        indexCer++;
        CertificateChange(msg.sender, input, 1);
    }
    function deleteCertificates(address input) public {
        certificates[input] = 0;
        CertificateChange(msg.sender, input, 0);
    }
    function showAllCer() public constant returns(address[10]) {
        return savingCertificates;
    }
    //important function
    function changeStudent(address input) public {
        previous = student;
        student = input;
        StudentChange(previous, student, msg.sender);
    }
    //show the target user
    function showStudent() public constant returns(address) {
        return student;
    }

    function showCreator() public constant returns(address) {
        return creator;
    }

    address public creator = 0x0;
    address public student = 0x0;
    address public previous = 0x0;

    bytes32[100] public savingVideos;
    address[10] public savingCertificates;
    
    mapping(bytes32 => uint) public videos;
    mapping(address => uint) public certificates;

    uint public indexV = 0;
    uint public indexCer = 0;
}