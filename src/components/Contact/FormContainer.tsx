/* eslint-disable max-lines-per-function */

import Button from '@design/Button/Button';
import Checkbox from '@design/Checkbox/Checkbox';
import Dot from '@design/Dot/Dot';
import SelectInput from '@design/SelectInput/SelectInput';
import Textarea from '@design/Textarea/Textarea';
import TextInput from '@design/TextInput/TextInput';
import emailjs from '@emailjs/browser';
import {
  NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
  NEXT_PUBLIC_EMAIL_JS_SERVICE_ID,
  NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID,
} from '@libs/constants/envs';
import useWindowSize from '@libs/hooks/useWindowSize';
import { translate } from '@libs/utils/translate';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { z, ZodError } from 'zod';

const checkBoxes = [
  translate('landing.contact.form.checkBoxes.productDesign'),
  translate('landing.contact.form.checkBoxes.webDesign'),
  translate('landing.contact.form.checkBoxes.branding'),
  translate('landing.contact.form.checkBoxes.development'),
  translate('landing.contact.form.checkBoxes.animation'),
  translate('landing.contact.form.checkBoxes.motion'),
];

// const budgetsData = [500, 800, 1000, 1500, 2000, 2500, 3000] as const;
const budgetsData = [
  '>$1000',
  '+$2000',
  '+$5000',
  '+$10000',
  '+$20000',
  '+$50000',
] as const;

interface SendEmailEvent extends React.FormEvent<HTMLFormElement> {}

const formSchema = z.object({
  fullName: z
    .string({
      required_error: 'Full name is required',
    })
    .min(1, { message: 'Full name is required' }),
  businessEmail: z.string().email({ message: 'Invalid email address' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' }),
  // fields: z.string().min(1, { message: 'Please select at least one field' }),
  budget: z
    .string({ required_error: 'Please select a budget' })
    .min(1, { message: 'Please select a budget' }),
});

const FormContainer = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitCount, setSubmitCount] = useState(0); // Track form submission count

  const t = useTranslations('landing.contact.form');

  const form = useRef<HTMLFormElement | null>(null);
  const { width } = useWindowSize();

  const validateField = (name: string, value: string) => {
    try {
      if (name === 'fields') {
        // formSchema.pick({ fields: true }).parse({ fields: value });
      } else {
        formSchema
          .pick({ [name]: true } as Record<keyof typeof formSchema.shape, true>)
          .parse({ [name]: value });
      }
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const sendEmail = async (e: SendEmailEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitCount(prev => prev + 1); // Increment submit count

    const formData = new FormData(e.target as HTMLFormElement);
    const selectedFields: string[] = [];

    checkBoxes.forEach(item => {
      const checkboxName = item.replaceAll(' ', '-').toLowerCase();
      if (formData.has(checkboxName)) {
        selectedFields.push(item);
      }
    });

    const allValues = Object.fromEntries(Array.from(formData.entries()));
    Object.assign(allValues, {
      fields: selectedFields.join(' - '),
    });

    try {
      // Validate form data
      formSchema.parse(allValues);
      setErrors({}); // Clear errors if validation passes
      if (form.current) {
        await emailjs.send(
          NEXT_PUBLIC_EMAIL_JS_SERVICE_ID ?? '',
          NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID ?? '',
          allValues,
          {
            publicKey: NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY,
          },
        );

        toast.success('Inquiry sent!', {
          position: width > 768 ? 'bottom-center' : 'top-center',
        });
        form.current.reset();
      }
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Failed to send email:', error);
        toast.error('Failed to send inquiry. Please try again.', {
          position: width > 768 ? 'bottom-center' : 'top-center',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = e.target as unknown as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    if (submitCount >= 1 && name) {
      validateField(name, value);
    }
  };

  return (
    <form
      className="relative flex flex-col gap-3 rounded-3xl bg-white px-8 py-6 pb-10 shadow-md"
      ref={form}
      onChange={handleFormChange} // Add onChange to the form
      onSubmit={sendEmail}
      style={{
        boxShadow: '0px 8px 7.9px -4px rgba(226, 226, 226, 0.73)',
      }}
    >
      <span className="text-sm font-medium !leading-[24px] text-[#0A0A11]">
        {t('contactInfo')}
      </span>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <TextInput
          id="fullName"
          name="fullName"
          error={errors.fullName}
          placeholder={t('fullName')}
        />
        <TextInput
          id="businessEmail"
          name="businessEmail"
          error={errors.businessEmail}
          placeholder={t('businessEmail')}
        />
      </div>
      <Textarea
        id="message"
        name="message"
        error={errors.message}
        placeholder={t('tellUs')}
      />

      <span className="text-sm font-medium !leading-[24px] text-[#0A0A11]">
        {t('whatDoHelp')}
      </span>
      <div className="flex w-full flex-wrap gap-3">
        {checkBoxes.map(item => (
          <Checkbox
            id={item.replaceAll(' ', '-').toLowerCase()}
            key={item}
            label={item}
            name={item.replaceAll(' ', '-').toLowerCase()}
          />
        ))}
      </div>
      {/* {errors.fields && <p className="text-sm text-red-500">{errors.fields}</p>} */}

      <SelectInput
        data={budgetsData.map(i => ({ label: `${i}`, value: i.toString() }))}
        id="budget"
        label={t('budget')}
        name="budget"
        error={errors.budget}
        placeholder={`${t('select')}...`}
      />

      <Button
        primary
        className="flex items-center justify-center gap-1.5"
        disabled={loading}
        type="submit"
        containerClass="my-3"
        loading={loading}
      >
        {loading ? (
          'Sending'
        ) : (
          <>
            <Dot animated size={7} color="#82D49F" />
            {t('sendMessage')}
          </>
        )}
      </Button>
      <p className="text-sm text-black">
        {t.rich('terms', {
          link: chunks => (
            <a
              className="underline underline-offset-2"
              href="#privacy"
              onClick={e => e.preventDefault()}
            >
              {chunks}
            </a>
          ),
        })}
      </p>
    </form>
  );
};

export default FormContainer;
