pragma solidity ^ 0.4.11;

contract Test {

    event StudentChange(address _beforeStudent, address _afterStudent, address _changer);
    
    //constructor 
    function Test(address _input) public {
        creator = msg.sender;
        student = _input;
        previous = _input;
    }
    function changeStudent(address _new) public {
        previous = student;
        student = _new;

        StudentChange(previous, student, msg.sender);
    }

    address private creator;
    address public student;
    address public previous;
 }