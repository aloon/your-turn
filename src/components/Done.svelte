<script lang="ts">
  export let onQueue: () => void;
</script>

<button on:click={onQueue} class="flex items-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="rgb(59, 130, 246)"
      stroke-width="2"
    ></circle>
    <polyline
      points="16 8 9 15 6 11"
      fill="none"
      stroke="rgb(59, 130, 246)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></polyline>
  </svg>

    <span>Done</span>

</button>