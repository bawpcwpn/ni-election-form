'use client';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { TextInput } from '@/components/TextInput';
import { RadioInput } from '@/components/RadioInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FieldError } from '@/components/FieldError';
import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export interface ElectionFormInputs {
    voting_method?: 'in_person' | 'online';
    title: 'Mr' | 'Mrs' | 'Ms' | 'Miss' | 'Dr' | 'Other';
    title_other?: string;
    current_given_name: string;
    current_family_name: string;
    previous_given_name?: string;
    previous_family_name?: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    current_address_1: string;
    current_address_2?: string;
    current_state?: string;
    current_postcode?: number;
    current_postal_address_1: string;
    current_postal_address_2?: string;
    current_postal_address_state?: string;
    current_postal_address_postcode?: number;
    mobile?: string;
    daytime?: string;
    email?: string;
    evidence: 'photo_id' | 'utility_notice' | 'stat_dec';
}

export default function Home() {
    const [blobURL, setBlobURL] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string>('');
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ElectionFormInputs>({
        defaultValues: {
            current_state: 'NSW',
            current_postcode: 2899,
            current_postal_address_state: 'NSW',
            current_postal_address_postcode: 2899,
        },
    });
    const sigCanvas = React.useRef<any>(null);

    const fields = watch();

    const onSubmit: SubmitHandler<ElectionFormInputs> = async (data) => {
        if (sigCanvas.current.isEmpty()) {
            setServerError('You must sign the form.');
        }
        if (submitting) {
            return;
        }
        try {
            setSubmitting(true);
            setServerError('');
            const signature = sigCanvas.current.toDataURL();
            const response = await fetch('/api/genPDF', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    signature,
                }),
            });
            if (response.status !== 200) {
                throw {
                    status: response.status,
                    message: (await response.json())?.error,
                };
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setBlobURL(url);
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank'; // Open in a new window
            a.rel = 'noopener noreferrer'; // Recommended for security reasons when using _blank
            a.click();
        } catch (e) {
            console.error(e);
            setServerError('An error occurred while generating your form. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    const clearSignature = () => {
        sigCanvas.current.clear();
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex min-h-full flex-col justify-start px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-screen-sm">
                    <h1 className="sm:text-center text-4xl text-green-700 font-bold leading-9 tracking-tight">
                        Norfolk Island Governance Committee Community Representatives Election
                    </h1>
                    <h2 className="mt-10 sm:text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Enrol to Vote
                    </h2>
                    <p className="mt-10 sm:text-center text-sm text-gray-500">
                        Fill in the form below to download a pre-filled & signed PDF form to enrol to vote. <br />
                        You can then email it to{' '}
                        <Link
                            className="text-green-500 underline hover:no-underline"
                            href="mailto:norfolk.ro@austelect.com?subject=Enrolment%20Form"
                        >
                            norfolk.ro@austelect.com
                        </Link>
                        , along with a photo of your proof of residency.
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-screen-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Voting Method</h2>
                                {errors.voting_method && <FieldError>You must select one of the below.</FieldError>}
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <fieldset className="flex-col sm:flex-row gap-y-3 flex gap-x-3 items-center">
                                            <RadioInput
                                                id="in_person"
                                                label="I want to vote in-person by pre-poll or at the polling booth on election day"
                                                {...register('voting_method', { required: true })}
                                                value="in_person"
                                                required
                                            />
                                            <RadioInput
                                                id="online"
                                                label="I want to vote online (current email address must be provided)"
                                                {...register('voting_method', { required: true })}
                                                value="online"
                                                required
                                            />
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Your details</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-3 sm:col-span-full">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                                Title
                                            </legend>
                                            <div className="flex-wrap sm:no-wrap gap-y-3 flex gap-x-3 items-center">
                                                <RadioInput
                                                    id="mr"
                                                    label="Mr"
                                                    {...register('title', { required: true })}
                                                    value="Mr"
                                                    required
                                                />
                                                <RadioInput
                                                    id="mrs"
                                                    label="Mrs"
                                                    {...register('title', { required: true })}
                                                    value="Mrs"
                                                    required
                                                />
                                                <RadioInput
                                                    id="ms"
                                                    label="Ms"
                                                    {...register('title', { required: true })}
                                                    value="Ms"
                                                    required
                                                />
                                                <RadioInput
                                                    id="miss"
                                                    label="Miss"
                                                    {...register('title', { required: true })}
                                                    value="Miss"
                                                    required
                                                />
                                                <RadioInput
                                                    id="dr"
                                                    label="Dr"
                                                    {...register('title', { required: true })}
                                                    value="Dr"
                                                    required
                                                />
                                                <RadioInput
                                                    id="other"
                                                    label="Other"
                                                    {...register('title', { required: true })}
                                                    value="Other"
                                                    required
                                                />
                                                <TextInput
                                                    placeholder="Other"
                                                    id="title_other"
                                                    required={fields.title === 'Other'}
                                                    errors={errors.title_other}
                                                    {...register('title_other', { required: fields.title === 'Other' })}
                                                />
                                            </div>
                                            {errors.title && <FieldError>You must select a title.</FieldError>}
                                        </fieldset>
                                    </div>
                                    <TextInput
                                        id="given_name"
                                        label="Given name(s)"
                                        autoComplete="given-name"
                                        {...register('current_given_name')}
                                        className="col-span-3"
                                        required
                                        errors={errors.current_given_name}
                                    />
                                    <TextInput
                                        id="family_name"
                                        label="Family name"
                                        autoComplete="family-name"
                                        {...register('current_family_name')}
                                        className="col-span-3"
                                        required
                                        errors={errors.current_family_name}
                                    />

                                    <TextInput
                                        id="previous_given_name"
                                        label="Previous Given name(s)"
                                        {...register('previous_given_name')}
                                        className="col-span-3"
                                        autoComplete="off"
                                        errors={errors.previous_given_name}
                                    />
                                    <TextInput
                                        id="previous_family_name"
                                        label="Previous Family name"
                                        {...register('previous_family_name')}
                                        className="col-span-3"
                                        autoComplete="off"
                                        errors={errors.previous_family_name}
                                    />

                                    <div className="col-span-2">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                                Date of birth
                                            </legend>
                                            <div className="flex items-center gap-x-3">
                                                <TextInput
                                                    id="dob_day"
                                                    label="Day"
                                                    autoComplete="bday-day"
                                                    required
                                                    {...register('dob_day', { required: true })}
                                                    errors={errors.dob_day}
                                                />
                                                <TextInput
                                                    id="dob_month"
                                                    label="Month"
                                                    autoComplete="bday-month"
                                                    required
                                                    {...register('dob_month', { required: true })}
                                                    errors={errors.dob_month}
                                                />
                                                <TextInput
                                                    id="dob_year"
                                                    label="Year"
                                                    autoComplete="bday-year"
                                                    required
                                                    {...register('dob_year', { required: true })}
                                                    errors={errors.dob_year}
                                                />
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                <p className="text-sm text-gray-600 mb-2">
                                    Clearly identify your residential address, matching the address on the evidence of
                                    your residency below. A locality name or mail service number is not enough.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <TextInput
                                        id="current_address_1"
                                        className="col-span-full"
                                        label="Current Address"
                                        autoComplete="street-address"
                                        required
                                        errors={errors.current_address_1}
                                        {...register('current_address_1', { required: true })}
                                    />
                                    <TextInput
                                        id="current_address_2"
                                        className="sm:col-span-2 sm:col-start-1"
                                        label="City"
                                        autoComplete="address-level2"
                                        errors={errors.current_address_2}
                                        {...register('current_address_2')}
                                    />
                                    <TextInput
                                        id="current_state"
                                        className="sm:col-span-2"
                                        label="State"
                                        autoComplete="state"
                                        required
                                        errors={errors.current_state}
                                        {...register('current_state')}
                                    />
                                    <TextInput
                                        id="current_postcode"
                                        className="sm:col-span-2"
                                        label="Postcode"
                                        autoComplete="postal-code"
                                        required
                                        errors={errors.current_postcode}
                                        {...register('current_postcode')}
                                    />

                                    <TextInput
                                        id="postal_address_1"
                                        className="col-span-full"
                                        label="Current Postal Address"
                                        autoComplete="street-address"
                                        required
                                        errors={errors.current_postal_address_1}
                                        {...register('current_postal_address_1', { required: true })}
                                    />
                                    <TextInput
                                        id="postal_address_2"
                                        className="sm:col-span-2 sm:col-start-1"
                                        label="City"
                                        autoComplete="address-level2"
                                        errors={errors.current_postal_address_2}
                                        {...register('current_postal_address_2')}
                                    />
                                    <TextInput
                                        id="postal_state"
                                        className="sm:col-span-2"
                                        label="State"
                                        autoComplete="state"
                                        required
                                        errors={errors.current_postal_address_state}
                                        {...register('current_postal_address_state')}
                                    />
                                    <TextInput
                                        id="postal_postcode"
                                        className="sm:col-span-2"
                                        label="Postcode"
                                        autoComplete="postal-code"
                                        required
                                        errors={errors.current_postal_address_postcode}
                                        {...register('current_postal_address_postcode')}
                                    />
                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Details</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <TextInput
                                        id="mobile"
                                        type="tel"
                                        className="col-span-3"
                                        label="Mobile Phone"
                                        autoComplete="tel"
                                        errors={errors.mobile}
                                        {...register('mobile')}
                                    />
                                    <TextInput
                                        id="daytime"
                                        type="tel"
                                        className="col-span-3"
                                        label="Daytime number"
                                        errors={errors.daytime}
                                        {...register('daytime')}
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="col-span-3 sm:col-span-full"
                                        label="Email address"
                                        autoComplete="email"
                                        errors={errors.email}
                                        required={fields.voting_method === 'online'}
                                        {...register('email', { required: fields.voting_method === 'online' })}
                                    />
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                                            Evidence of your identity, age and residency
                                        </legend>
                                        {errors.evidence && <FieldError>You must select one of the below.</FieldError>}
                                        <div className="mt-6 space-y-6">
                                            <RadioInput
                                                id="photo_id"
                                                label="(a) Photo Identification with NI Residential Address"
                                                {...register('evidence', { required: true })}
                                                required
                                                value="photo_id"
                                            />
                                            <RadioInput
                                                id="utility_notice"
                                                label="(b) Rates or Utility Notice, and ATM or Medicare Card or Photo ID"
                                                {...register('evidence', { required: true })}
                                                required
                                                value="utility_notice"
                                            />
                                            <RadioInput
                                                id="stat_dec"
                                                label="(c) A statutory declaration made by a person who can attest to the residential address, length of residency on Norfolk Island, and date of birth of the person who does not have the identification listed in (a) or (b) above."
                                                {...register('evidence', { required: true })}
                                                required
                                                value="stat_dec"
                                            />
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div>
                                <div className="mt-10">
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            Signature
                                        </label>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Draw in the box below to record your signature.
                                        </p>
                                        <div className="border border-gray-900/10 rounded overflow-hidden bg-white w-[350px] h-[100px]">
                                            <SignatureCanvas
                                                ref={sigCanvas}
                                                canvasProps={{ width: 350, height: 100 }}
                                                backgroundColor={`rgba(255,255,255,1)`}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-block text-xs mt-1 border-gray-400 border rounded text-gray-700 p-1 bg-white hover:border-green-500 hover:text-white hover:bg-green-500 transition-all duration-200"
                                            onClick={() => clearSignature()}
                                        >
                                            Clear Signature
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {serverError && (
                            <div className="mt-6">
                                <div className="bg-red-50 rounded text-sm text-red-600 py-2 px-3 border border-red-600">
                                    {serverError}
                                </div>
                            </div>
                        )}

                        <p className="mt-20 text-gray-700 mb-1">
                            <strong>
                                IMPORTANT: When you click <em>Download Form</em>, you will then need to:
                            </strong>
                        </p>
                        <ol className="text-sm mb-20 text-gray-700 list-decimal pl-5">
                            {!fields.evidence && (
                                <li>
                                    <strong>
                                        Select a form of evidence of your identity above, before you continue!
                                    </strong>
                                </li>
                            )}
                            {fields.evidence && (
                                <>
                                    {fields.evidence === 'photo_id' && (
                                        <li>
                                            Photograph your photo identification with NI Residential Address (eg.
                                            Driver&apos;s License)
                                        </li>
                                    )}
                                    {fields.evidence === 'utility_notice' && (
                                        <>
                                            <li>Photograph your Rates or Utility Notice</li>
                                            <li>ATM Card, Medicare Card or Photo ID</li>
                                        </>
                                    )}
                                    {fields.evidence === 'stat_dec' && (
                                        <>
                                            <li>
                                                <Link
                                                    href="/StatDec.pdf"
                                                    download
                                                    target="_blank"
                                                    className="text-green-600 underline hover:no-underline"
                                                >
                                                    Download, print and fill out Statutory Declaration.
                                                </Link>
                                            </li>
                                            <li>Photograph the Statutory Declaration</li>
                                        </>
                                    )}
                                    <li>
                                        <Link
                                            className="text-green-600 underline hover:no-underline"
                                            href={`mailto:norfolk.ro@austelect.com?subject=Enrolment%20Form&body=Hi%2C%0D%0A%0D%0APlease%20find%20attached%20my%20enrolment%20form%20and%20evidence%20of%20my%20identity!%0D%0A%0D%0AKind%20regards%2C%0D%0A${fields.current_given_name}%20${fields.current_family_name}`}
                                        >
                                            Send an email to norfolk.ro@austelect.com{' '}
                                        </Link>{' '}
                                        with the PDF of this form, and photograph evidence from above.
                                    </li>
                                </>
                            )}
                        </ol>
                        <div className="flex items-center justify-end gap-x-6">
                            <button
                                type="reset"
                                className="text-sm font-semibold leading-6 text-gray-900"
                                disabled={submitting}
                            >
                                Reset
                            </button>
                            <Button type="submit" disabled={submitting || !fields.evidence}>
                                {submitting ? 'Loading...' : 'Download Form'}
                            </Button>
                        </div>
                        {blobURL && (
                            <div className="text-center mt-4">
                                PDF didn&apos;t open?{' '}
                                <Link
                                    className="text-green-600 underline hover:no-underline"
                                    href={blobURL}
                                    target="_blank"
                                >
                                    Click here.
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}
