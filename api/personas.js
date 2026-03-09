module.exports = (req, res) => {
  res.json([
    { id: 'zenclaw', name: 'ZenClaw', desc: '冷峻洞察' },
    { id: 'cyberzen', name: 'Cyber-Zen', desc: '温暖诗意' },
    { id: 'stoic', name: 'Stoic', desc: '理性力量' },
    { id: 'futureSurvivor', name: 'Future-Survivor', desc: '长期希望' }
  ]);
};
