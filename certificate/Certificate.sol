pragma solidity ^0.4.11;

contract Certificate {
    enum Status { Confirmed, Waiting, Failed }
    
    struct Video {
        uint videoId;
        bytes32 info;
        Status status;
    }

    event VideoChange(address _changer, uint _videoId, uint action);
    event VideoStatusChange(address _changer, uint _videoId, Status _to);

    modifier checkCounter {
        require(current_counter < 25);
        _;
    }
    
    modifier onlyVideo (uint _videoId) {
        require(!findVideo(_videoId));
        _;
    }
    
    modifier includeVideo (uint _videoId) {
        require(findVideo(_videoId));
        _;
    }
    function Certificate() {
        creator = msg.sender;
    }

    function addVideo(uint _videoId, bytes32 _info) checkCounter onlyVideo(_videoId) {
        uint empty = renderEmptyPlace();
        
        require(empty == empty_place);

        videos[empty_place].info = _info;
        videos[empty_place].videoId = _videoId;
        videos[empty_place].status = Status.Waiting;
        
        videoIndex[_videoId] = empty_place;
        current_counter++;

        VideoChange(msg.sender, _videoId, 1);
    }
    
    function deleteVideo(uint _videoId) includeVideo(_videoId) {
        uint index = videoIndex[_videoId];
        delete videos[index];
        delete videoIndex[_videoId];
        current_counter--;

        VideoChange(msg.sender, _videoId, 0);
    }
    
    function confirmVideo(uint _videoId) includeVideo(_videoId){
        uint index = videoIndex[_videoId];
        videos[index].status = Status.Confirmed;
        confirmed_count++;

        VideoStatusChange(msg.sender, _videoId, Status.Confirmed);
    }

    function failedVideo(uint _videoId) includeVideo(_videoId) {
        uint index = videoIndex[_videoId];
        videos[index].status = Status.Failed;
        confirmed_count--;

        VideoStatusChange(msg.sender, _videoId, Status.Failed);
    }

    function renderEmptyPlace() checkCounter returns (uint) {
        for (uint index; index < max_length; index++) {
            if (!findVideo(videos[index].videoId)) {
                empty_place = index;
                return index;
            }
        }
        empty_place = max_length + 1;
        return max_length + 1;
    }

    function confirmCount() returns (bool) {
        uint count = 0;
        for (uint index; index < max_length; index++) {
            if (videos[index].status == Status.Confirmed) {
                count++;
            }
        }
        if (count == 25) {
            if_confirmed = true;
        }
        return if_confirmed;
    }
       
    function findVideo(uint _videoId) returns (bool) {
        if (videoIndex[_videoId] < 0) {
            return false;
        } else if (videoIndex[_videoId] > max_length) {
            return false;
        }
        return true;
    }
    function getConfirmed() constant returns (bool) {
        return if_confirmed;
    }
    
    address public creator;

    uint public current_counter = 0;

    //handle certificate videos length
    uint public max_length = 25;
    uint public empty_place = 26;

    uint public confirmed_count = 0;
    bool public if_confirmed = false;

    mapping (uint => uint) videoIndex;
    Video[50] public videos;
}