'use client';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { TextInput } from '@/components/TextInput';
import { RadioInput } from '@/components/RadioInput';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ElectionFormInputs {
    voting_method?: 'in_person' | 'online';
    title: 'Mr' | 'Mrs' | 'Ms' | 'Miss' | 'Dr' | 'Other';
    title_other?: string;
    current_given_name: string;
    current_family_name: string;
    previous_given_name?: string;
    previous_family_name?: string;
    date_of_birth: string;
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
    const { register, handleSubmit, watch } = useForm<ElectionFormInputs>({
        defaultValues: {
            current_state: 'NSW',
            current_postcode: 2899,
            current_postal_address_state: 'NSW',
            current_postal_address_postcode: 2899,
        },
    });

    const fields = watch();

    const onSubmit: SubmitHandler<ElectionFormInputs> = async (data) => {};

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className="flex min-h-full flex-col justify-start px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-screen-sm">
                    <h1 className="text-center text-4xl text-green-700 font-bold leading-9 tracking-tight">
                        Norfolk Island Governance Committee Community Representatives Election
                    </h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Enrol to Vote
                    </h2>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Fill in the form below to download a pre-filled & signed PDF form to enrol to vote. <br />
                        You can then email it to{' '}
                        <Link
                            className="text-green-500 underline hover:no-underline"
                            href="mailto:norfolk.ro@austelect.com&subject=Enrollment%20Form"
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
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <fieldset className="flex gap-x-3 items-center">
                                            <RadioInput
                                                id="in_person"
                                                label="I want to vote in-person by pre-poll or at the polling booth on election day"
                                                {...register('voting_method', { required: true })}
                                                value="in_person"
                                            />
                                            <RadioInput
                                                id="online"
                                                label="I want to vote online (current email address must be provided)"
                                                {...register('voting_method', { required: true })}
                                                value="online"
                                            />
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Your details</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">
                                                Title
                                            </legend>
                                            <div className="flex gap-x-3 items-center">
                                                <RadioInput
                                                    id="mr"
                                                    label="Mr"
                                                    {...register('title', { required: true })}
                                                    value="Mr"
                                                />
                                                <RadioInput
                                                    id="mrs"
                                                    label="Mrs"
                                                    {...register('title', { required: true })}
                                                    value="Mrs"
                                                />
                                                <RadioInput
                                                    id="ms"
                                                    label="Ms"
                                                    {...register('title', { required: true })}
                                                    value="Ms"
                                                />
                                                <RadioInput
                                                    id="miss"
                                                    label="Miss"
                                                    {...register('title', { required: true })}
                                                    value="Miss"
                                                />
                                                <RadioInput
                                                    id="dr"
                                                    label="Dr"
                                                    {...register('title', { required: true })}
                                                    value="Dr"
                                                />
                                                <RadioInput
                                                    id="other"
                                                    label="Other"
                                                    {...register('title', { required: true })}
                                                    value="Other"
                                                />
                                                <TextInput
                                                    placeholder="Other"
                                                    id="title_other"
                                                    {...register('title_other', { required: fields.title === 'Other' })}
                                                />
                                            </div>
                                        </fieldset>
                                    </div>
                                    <TextInput
                                        id="given_name"
                                        label="Given name(s)"
                                        autoComplete="given-name"
                                        {...register('current_given_name')}
                                        className="sm:col-span-3"
                                    />
                                    <TextInput
                                        id="family_name"
                                        label="Family name"
                                        autoComplete="family-name"
                                        {...register('current_family_name')}
                                        className="sm:col-span-3"
                                    />

                                    <TextInput
                                        id="previous_given_name"
                                        label="Previous Given name(s)"
                                        {...register('previous_given_name')}
                                        className="sm:col-span-3"
                                    />
                                    <TextInput
                                        id="previous_family_name"
                                        label="Previous Family name"
                                        {...register('previous_family_name')}
                                        className="sm:col-span-3"
                                    />

                                    <TextInput
                                        id="dob"
                                        type="date"
                                        label="Date of Birth"
                                        autoComplete="bday"
                                        {...register('date_of_birth')}
                                        className="sm:col-span-3"
                                    />
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <TextInput
                                        id="current_address_1"
                                        className="col-span-full"
                                        label="Current Address"
                                        autoComplete="street-address"
                                        {...register('current_address_1', { required: true })}
                                    />
                                    <TextInput
                                        id="current_address_2"
                                        className="sm:col-span-2 sm:col-start-1"
                                        label="City"
                                        autoComplete="address-level2"
                                        {...register('current_address_2')}
                                    />
                                    <TextInput
                                        id="current_state"
                                        className="sm:col-span-2"
                                        label="State"
                                        autoComplete="state"
                                        {...register('current_state')}
                                    />
                                    <TextInput
                                        id="current_postcode"
                                        className="sm:col-span-2"
                                        label="Postcode"
                                        autoComplete="postal-code"
                                        {...register('current_postcode')}
                                    />

                                    <TextInput
                                        id="postal_address_1"
                                        className="col-span-full"
                                        label="Current Postal Address"
                                        autoComplete="street-address"
                                        {...register('current_postal_address_1', { required: true })}
                                    />
                                    <TextInput
                                        id="postal_address_2"
                                        className="sm:col-span-2 sm:col-start-1"
                                        label="City"
                                        autoComplete="address-level2"
                                        {...register('current_postal_address_2')}
                                    />
                                    <TextInput
                                        id="postal_state"
                                        className="sm:col-span-2"
                                        label="State"
                                        autoComplete="state"
                                        {...register('current_postal_address_state')}
                                    />
                                    <TextInput
                                        id="postal_postcode"
                                        className="sm:col-span-2"
                                        label="Postcode"
                                        autoComplete="postal-code"
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
                                        {...register('mobile')}
                                    />
                                    <TextInput
                                        id="daytime"
                                        type="tel"
                                        className="col-span-3"
                                        label="Daytime number"
                                        {...register('daytime')}
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="col-span-full"
                                        label="Email address"
                                        autoComplete="email"
                                        {...register('email', { required: fields.title === 'Other' })}
                                    />
                                </div>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                                            Evidence of your identity, age and residency
                                        </legend>
                                        <div className="mt-6 space-y-6">
                                            <RadioInput
                                                id="photo_id"
                                                label="(a) Photo Identification with NI Residential Address"
                                                {...register('evidence', { required: true })}
                                                value="photo_id"
                                            />
                                            <RadioInput
                                                id="utility_notice"
                                                label="(b) Rates or Utility Notice, and ATM or Medicare Card or Photo ID"
                                                {...register('evidence', { required: true })}
                                                value="utility_notice"
                                            />
                                            <RadioInput
                                                id="stat_dec"
                                                label="A statutory declaration made by a person who can attest to the residential address, length of residency on Norfolk Island, and date of birth of the person who does not have the identification listed in (a) or (b) above."
                                                {...register('evidence', { required: true })}
                                                value="stat_dec"
                                            />
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
                                Reset
                            </button>
                            <Button type="submit">Download Form</Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
