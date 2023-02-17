import { PersonType } from '../types/PersonType';

type AddAction = {
  type: 'people/ADD';
  payload: PersonType[];
};

type Action = AddAction;

const add = (people: PersonType[]): AddAction => ({
  type: 'people/ADD',
  payload: people,
});

export const actions = { add };

const peopleReducer = (
  people: PersonType[] = [],
  action: Action
): PersonType[] => {
  switch (action.type) {
    case 'people/ADD':
      return action.payload;

    default:
      return people;
  }
};

export default peopleReducer;
