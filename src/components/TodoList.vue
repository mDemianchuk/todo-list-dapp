<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <v-text-field
          v-model="taskContent"
          label="Add task"
          hide-details="auto"
          @keydown.enter="createTask"
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
              @change="toggleTaskStatus(index)"
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
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    taskContent: "",
  }),
  methods: {
    toggleTaskStatus(taskIndex) {
      this.$emit("toggleTaskStatus", taskIndex);
    },
    createTask(event) {
      event.preventDefault();
      this.$emit("createTask", this.taskContent);
      this.resetTaskContent();
    },
    resetTaskContent() {
      this.taskContent = "";
    },
  },
};
</script>
