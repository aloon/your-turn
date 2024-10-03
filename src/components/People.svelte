<script lang="ts">
    import type { PersonDto } from "../personDto.ts";
    import Person from "./Person.svelte";

    let peopleFromServer: PersonDto[] = [];

    const peopleElement = document.getElementById("people-data") as HTMLElement;
    if (peopleElement) {
        peopleFromServer = JSON.parse(peopleElement.dataset.people as string);
    }

    const remove = (personId: string) => {
        peopleFromServer = peopleFromServer.filter((person) => person.id !== personId);
    };

    const up = (personId: string) => {
        const index = peopleFromServer.findIndex((person) => person.id === personId);
        if (index > 0) {
            const personToMove = peopleFromServer[index];
            peopleFromServer = [...peopleFromServer.slice(0, index - 1), personToMove, ...peopleFromServer.slice(index - 1, index), ...peopleFromServer.slice(index + 1)];
        }
    };

    const down = (personId: string) => {
        const index = peopleFromServer.findIndex((person) => person.id === personId);
        if (index < peopleFromServer.length - 1) {
            const personToMove = peopleFromServer[index];
            peopleFromServer = [...peopleFromServer.slice(0, index), ...peopleFromServer.slice(index + 1, index + 2), personToMove, ...peopleFromServer.slice(index + 2)];
        }
    };
</script>

{#each peopleFromServer as person, i}
    <Person 
        position={i} 
        allPeople={peopleFromServer} 
        name={person.name} 
        id={person.id} 
        onDelete={() => remove(person.id)}
        onUp={() => up(person.id)}
        onDown={() => down(person.id)}
     />
{/each}