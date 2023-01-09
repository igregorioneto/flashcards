export function shuffleArray(array) {
  const shuffle = [...array];

  for (let i = 0; i < shuffle.length - 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffle[i], shuffle[j]] = 
      [shuffle[j], [shuffle[i]]];
    
  }

  return shuffle;
}