<script lang="ts">
  export let onAdd: () => void;
</script>

<div class="flex items-center justify-between bg-white p-4 rounded-lg shadow mt-4">
  <input
    id="add-person"
    type="text"
    class="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Add person"
    required
    minlength="3"
    maxlength="30"
    on:keydown={onAdd}
  />
</div>
