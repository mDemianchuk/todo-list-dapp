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
    isAlertVisible: false,
    isAlertDismisable: false,
    errorMessage: "",
  }),
  async mounted() {
    if (this.ethProvider) {
      try {
        await this.setAccount();
        this.setContract();
        await this.fetchTasks();
      } catch (e) {
        this.showAlert(e);
      }
    } else {
      this.showAlert("Please install MetaMask.");
    }
    this.isLoaded = true;
  },
  methods: {
    async setAccount() {
      return this.ethProvider
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => {
          this.account = accounts[0];
        })
        .catch(() => {
          throw "Unable to load accounts.";
        });
    },
    setContract() {
      Contract.setProvider(this.ethProvider);
      this.contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, {
        from: this.account,
      });
    },
    async fetchTasks() {
      return this.contract.methods
        .getTasks()
        .call()
        .then((tasks) => {
          this.tasks = tasks;
        });
    },
    async createTask(content) {
      return this.contract.methods
        .createTask(content)
        .send()
        .catch((e) => {
          this.showAlert(e.message, true);
        });
    },
    async toggleTaskStatus(index) {
      return this.contract.methods
        .toggleTaskStatus(index)
        .send()
        .catch((e) => {
          this.showAlert(e.message, true);
        });
    },
    showAlert(errorMessage, isAlertDismisable = false) {
      this.errorMessage = errorMessage;
      this.isAlertDismisable = isAlertDismisable;
      this.isAlertVisible = true;
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
      <v-dialog v-model="isAlertVisible" width="600px" persistent>
        <v-alert
          v-model="isAlertVisible"
          :dismissible="isAlertDismisable"
          class="mb-0"
          type="error"
          border="left"
        >
          {{ errorMessage }}
        </v-alert>
      </v-dialog>
    </v-main>
  </v-app>
</template>
