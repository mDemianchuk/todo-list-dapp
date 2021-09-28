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
    account: "",
    contract: null,
    tasks: [],
    isLoaded: false,
  }),
  async mounted() {
    if (this.ethProvider) {
      await this.setAccount();
      this.setContract();
      await this.fetchTasks();
      this.isLoaded = true;
    } else {
      console.log("Please install MetaMask.");
    }
  },
  methods: {
    async setAccount() {
      const accounts = await this.ethProvider.request({
        method: "eth_requestAccounts",
      });
      this.account = accounts[0];
    },
    setContract() {
      Contract.setProvider(this.ethProvider);
      this.contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, {
        from: this.account,
      });
    },
    async fetchTasks() {
      this.tasks = await this.contract.methods.getTasks().call();
    },
    async createTask(content) {
      this.contract.methods
        .createTask(content)
        .send()
        .once("receipt", (receipt) => {
          console.log(receipt);
        });
    },
    async toggleTaskStatus(index) {
      this.contract.methods
        .toggleTaskStatus(index)
        .send()
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
      <v-app-bar-title>Todo List DApp</v-app-bar-title>
      <v-spacer />
      <span v-if="account">Account: {{ account }}</span>
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
