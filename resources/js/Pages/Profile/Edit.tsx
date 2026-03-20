import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Edit({ mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-sm font-semibold text-gray-800">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-2xl space-y-6">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.04)]">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.04)]">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-[0px_2px_4px_0px_hsla(0,0%,0%,0.04)]">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
