<script lang="ts">
    import { page } from '$app/stores';

    const result = $page.url.searchParams.get('amount');
</script>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Calculation Result
        </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div class="text-center">
                <p class="text-xl font-medium text-gray-900">
                    Your calculated amount is:
                </p>
                <p class="mt-4 text-4xl font-bold text-indigo-600">
                    ${result}
                </p>
                
                    href="/"
                    class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Calculate Another
                </a>
            </div>
        </div>
    </div>
</div>