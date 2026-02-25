'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import {
  NEXT_PUBLIC_CAL_CURRENT_EVENT,
  NEXT_PUBLIC_CAL_USERNAME,
} from '@libs/constants/envs';
import { useEffect } from 'react';

export default function BookCall() {
  console.log({
    CAL_USER: process.env.NEXT_PUBLIC_CAL_USERNAME,
    CAL_EVENT: process.env.NEXT_PUBLIC_CAL_CURRENT_EVENT,
  });
  useEffect(() => {
    // eslint-disable-next-line func-names
    (async function () {
      const cal = await getCalApi({
        namespace: NEXT_PUBLIC_CAL_CURRENT_EVENT,
      });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: 'light',
      });
    })();
  }, []);
  return (
    <div
      className="relative flex min-h-96 flex-col gap-3 rounded-3xl bg-white py-6 pb-10 shadow-md"
      style={{
        boxShadow: '0px 8px 7.9px -4px rgba(226, 226, 226, 0.73)',
      }}
    >
      <Cal
        calLink={`${NEXT_PUBLIC_CAL_USERNAME}/${NEXT_PUBLIC_CAL_CURRENT_EVENT}`}
        namespace={NEXT_PUBLIC_CAL_CURRENT_EVENT}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
        config={{ theme: 'light' }}
      />
    </div>
  );
}
