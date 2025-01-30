import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const amount = url.searchParams.get('amount');
    return {
        amount
    };
};