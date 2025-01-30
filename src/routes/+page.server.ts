import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const amount = data.get('amount');

    // Validate the data server-side as well
    if (!name || !email || !amount) {
      return fail(400, { error: 'All fields are required' });
    }

    // Calculate something (example calculation)
    const result = Number(amount) * 1.2; // 20% increase

    // Store the result in the session or pass it to the result page
    throw redirect(303, `/result?amount=${result}`);
  }
} satisfies Actions;