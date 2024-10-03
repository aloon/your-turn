<script lang="ts">
    import type { PersonDto } from "../personDto.ts";
    import Person from "./Person.svelte";

    let peopleNames: string[] = [];
    const peopleNamesElement = document.getElementById("people-names") as HTMLElement;
    if (peopleNamesElement) {
        peopleNames = JSON.parse(peopleNamesElement.dataset.people as string);
    }

    const remove = (index: number) => {
        peopleNames = [...peopleNames.slice(0, index), ...peopleNames.slice(index + 1)];
    };

    const up = (index: number) => {
        if (index > 0) {
            const personToMove = peopleNames[index];
            peopleNames = [
                ...peopleNames.slice(0, index - 1),
                personToMove,
                ...peopleNames.slice(index - 1, index),
                ...peopleNames.slice(index + 1)
            ];
        }
    };

    const down = (index: number) => {
        if (index < peopleNames.length - 1) {
            const personToMove = peopleNames[index];
            peopleNames = [
                ...peopleNames.slice(0, index),
                ...peopleNames.slice(index + 1, index + 2),
                personToMove,
                ...peopleNames.slice(index + 2)
            ];
        }
    };
</script>

{#each peopleNames as name, i}
    <Person 
        position={i} 
        allPeople={peopleNames} 
        onDelete={() => remove(i)}
        onUp={() => up(i)}
        onDown={() => down(i)}
     />
{/each}