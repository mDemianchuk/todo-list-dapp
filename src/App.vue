<script>
import TodoList from "./components/TodoList";

export default {
  components: {
    TodoList,
  },
  data: () => ({
    //
  }),
};
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span>Todo List DApp</span>
      <v-spacer />
      <span>Address:</span>
    </v-app-bar>
    <v-main>
      <TodoList />
    </v-main>
  </v-app>
</template>

