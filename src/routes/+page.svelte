<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import FormCalculator from '../components/FormCalculator.svelte';
    let errors: { [key: string]: string } = {};
    
    function validateForm(formData: FormData): boolean {
      errors = {};
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const amount = formData.get('amount') as string;
  
      if (!name?.trim()) {
        errors.name = 'Name is required';
      }
      
      if (!email?.trim()) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = 'Invalid email format';
      }
      
      if (!amount?.trim()) {
        errors.amount = 'Amount is required';
      } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
        errors.amount = 'Amount must be a positive number';
      }
  
      return Object.keys(errors).length === 0;
    }
  </script>
  
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Calculation Form
      </h2>
    </div>
  
    <div class="mt-8 ">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <FormCalculator />
      </div>
    </div>
  </div>