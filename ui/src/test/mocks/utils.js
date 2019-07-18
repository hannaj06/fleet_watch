const names = [
  'Joe Hanna',
  'Nico Mihalich',
  'Graeme Calloway',
  'Alex Brown',
  'Jon Dwyer',
  'Cal Brooks',
  'Rob Macnamara',
  'Charles Wu',
  'Harris Fisher',
  'Andy McLaughlin',
  'Nick Tsantes',
  'Alex Barat',
  'Kevbot',
];

const boats = [
  'Private 1x',
  'Club 1x',
  'Caro 8+',
  'Garver 8+',
  'Nik 4+',
  'Akaimi 4-',
  '1936 4x',
];

const times = [
  '6:30am',
  '5:44am',
  '6:32am',
  '6:34am',
  '5:55am',
  '5:40am',
  '4:20am',
  '4:45am',
  '7:10am',
];

function generateId() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getAllBoats() {
  return boats.map((boat) => {
    return {
      type: 'boat',
      id: boat,
      attributes: {
        boatName: boat,
      },
    };
  });
}

function generateMember() {
  return {
    type: 'member',
    id: generateId(),
    attributes: {
      firstName: getRandom(names).split(' ')[0],
      lastName: getRandom(names).split(' ')[1],
    },
  };
}

function generateTrip(owner = 'me') {
  return {
    type: 'trip',
    id: generateId(),
    attributes: {
      launch: getRandom(times),
      land: getRandom(times),
      meters: Math.floor(Math.random() * 15),
    },
    relationships: {
      member: { data: { type: 'member', id: owner } },
      boat: { data: { type: 'boat', id: getRandom(boats) } },
    },
  };
}

export { getRandom, generateTrip, getAllBoats, generateMember };
