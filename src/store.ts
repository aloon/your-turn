import { atom } from 'nanostores';
import type { PersonDto} from "./personDto.ts";

export const people = atom<PersonDto[]>([]);