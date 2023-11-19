import type { LocateModel } from 'commonTypesWithClient/locationmodel';
import { atom } from 'jotai';

export const locationAtom = atom<LocateModel | null>(null);
