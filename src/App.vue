<script>
import Contract from "web3-eth-contract";
import TodoList from "./components/TodoList";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./utils/contract-details";

export default {
  components: {
    TodoList,
  },
  data: () => ({
    ethProvider: window.ethereum,
    accounts: [],
    contract: null,
    tasks: [],
    isLoaded: false,
  }),
  async mounted() {
    if (this.ethProvider) {
      await this.setAccounts();
      this.setContract();
      await this.fetchTasks();
      this.isLoaded = true;
    } else {
      console.log("Please install MetaMask.");
    }
  },
  methods: {
    async setAccounts() {
      this.accounts = await this.ethProvider.request({
        method: "eth_requestAccounts",
      });
    },
    setContract() {
      Contract.setProvider(this.ethProvider);
      this.contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    },
    async fetchTasks() {
      this.tasks = await this.contract.methods.getTasks().call();
    },
    async createTask(content) {
      this.contract.methods
        .createTask(content)
        .send({ from: this.accounts[0] })
        .once("receipt", (receipt) => {
          console.log(receipt);
        });
    },
    async toggleTaskStatus(index) {
      this.contract.methods
        .toggleTaskStatus(index)
        .send({ from: this.accounts[0] })
        .once("receipt", (receipt) => {
          console.log(receipt);
        });
    },
  },
};
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span>Todo List DApp</span>
      <v-spacer />
      <span v-if="accounts.length">Account: {{ accounts[0] }}</span>
    </v-app-bar>
    <v-main>
      <v-progress-linear v-if="!isLoaded" absolute indeterminate />
      <TodoList
        v-else
        :tasks="tasks"
        @createTask="createTask"
        @toggleTaskStatus="toggleTaskStatus"
      />
    </v-main>
  </v-app>
</template>
