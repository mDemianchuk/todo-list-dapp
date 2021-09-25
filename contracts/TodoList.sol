// SPDX-License-Identifier: ISC
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        string content;
        bool isCompleted;
    }

    mapping(address => Task[]) tasks;

    event TaskCreated(string content, bool isCompleted);

    event TaskStatusToggled(uint256 index, bool isCompleted);

    function getTasks() public view returns (Task[] memory) {
        return tasks[msg.sender];
    }

    function getTask(uint256 _index) public view returns (Task memory) {
        return tasks[msg.sender][_index];
    }

    function createTask(string memory _content) public {
        tasks[msg.sender].push(Task(_content, false));
        emit TaskCreated(_content, false);
    }

    function toggleTaskStatus(uint256 _index) public {
        Task memory _task = tasks[msg.sender][_index];
        _task.isCompleted = !_task.isCompleted;
        tasks[msg.sender][_index] = _task;
        emit TaskStatusToggled(_index, _task.isCompleted);
    }
}
