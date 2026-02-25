import { init } from '@fullstacksjs/eslint-config';

export default init({
  typescript: true,
  next: true,
  prettier: true,
  react: true,
  tailwind: true,

  // You can pass extends here
  rules: {
    '@eslint-react/dom/no-missing-button-type': 'off',
    'tailwindcss/no-custom-classname': 'off',
  },
});
