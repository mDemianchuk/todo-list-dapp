<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-text-field
          v-model="taskContent"
          label="Add task"
          hide-details="auto"
          @keydown.enter="addTask"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-list flat v-if="tasks.length">
        <v-subheader>My Tasks:</v-subheader>
        <v-list-item v-for="(task, index) in tasks" :key="index">
          <v-list-item-action>
            <v-checkbox
              :input-value="task.isCompleted"
              color="primary"
              @change="toggle"
            />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ task.content }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tasks: [],
    taskContent: "",
  }),
  methods: {
    toggle() {
      console.log("here");
    },
    addTask(event) {
      event.preventDefault();
      this.tasks.push({ content: this.taskContent, isCompleted: false });
      this.resetTaskContent();
    },
    resetTaskContent() {
      this.taskContent = "";
    },
  },
};
</script>
