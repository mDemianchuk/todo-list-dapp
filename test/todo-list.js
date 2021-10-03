const TodoList = artifacts.require("./TodoList");

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('TodoList', ([address1, address2]) => {
    let contract;

    beforeEach(async () => {
        contract = await TodoList.new();
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await contract.address;
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })
    })

    describe('user task list', async () => {

        it('is empty on start', async () => {
            const tasks = await contract.getTasks({ from: address1 });
            assert.notEqual(null, tasks);
            assert.notEqual(undefined, tasks);
            assert.equal(0, tasks.length);
        })

        it('changes when a task is added', async () => {
            const taskContent = "My urgent task";
            await contract.createTask(taskContent, { from: address1 });
            const tasks = await contract.getTasks({ from: address1 });
            assert.equal(1, tasks.length);
            assert.equal(taskContent, tasks[0].content);
        })

        it('doesn\'t change when a task is added for another user', async () => {
            const taskContent = "My urgent task";
            await contract.createTask(taskContent, { from: address1 });
            const tasks = await contract.getTasks({ from: address2 });
            assert.equal(0, tasks.length);
        })
    })
})
