import messages from '@messages/en.json';
import { createTranslator } from 'next-intl';

export const translate = createTranslator({ locale: 'en', messages });
