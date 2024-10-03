<script lang="ts">
    import type { PersonDto } from "../personDto.ts";

    export let name: string;
    export let id: string;
    export let position: number;
    export let allPeople: PersonDto[];
    export let onDelete: () => void;
    export let onUp: () => void;
    export let onDown: () => void;
  </script>

<div class="flex items-center justify-between bg-white p-4 rounded-lg shadow person mt-4" id={id}>
    
    <div class="flex flex-col space-y-2">
      {#if position !== 0}
      <button on:click={onUp} class="bg-gray-300 p-2 rounded hover:bg-gray-400 up">        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 pointer-events-none">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      {/if}

      {#if position!== allPeople.length-1}
      <button on:click={onDown} class="bg-gray-300 p-2 rounded hover:bg-gray-400 down">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 pointer-events-none">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
      {/if}

    </div>
    
    <div class="flex items-center justify-between text-lg font-medium">
      <div class="flex-1 text-center">
        {name}
      </div>
      <!-- {#if position !== 0}<Logo width={80} height={80} />{/if} -->
    </div>
    
    <button on:click={onDelete} class="bg-blue-500 text-white p-2 rounded hover:bg-red-500 transition duration-300 remove">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 pointer-events-none">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
</div>