pragma solidity ^ 0.4.11;

contract EventTest {
    
    event StudentChange(address beforeStudent, address afterStudent, address changer);

    function EventTest(address _input) public{
        creator = msg.sender;
        owner = _input;
        previous = _input;
    }

    function changeOwner(address _new) public {
        previous = owner;
        owner = _new;

        StudentChange(previous, owner, msg.sender);
    }

    address public creator;
    address public owner;
    address public previous;
}