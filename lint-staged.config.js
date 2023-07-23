module.exports = {
  '{apps,libs,tools,docs}/**/*.{js,jsx,ts,tsx}': [
    'nx affected --target lint --uncommitted --fix true',
    'nx affected --target test --uncommitted',
    'nx format:write --uncommitted',
  ],
  '*.{md}': ['prettier --write', 'nx format:write --uncommitted'],
};
