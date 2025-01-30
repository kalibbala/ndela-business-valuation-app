<!-- ValuationResults.svelte -->
<script lang="ts">
    import type { ValuationResult } from './../services/ValuationService';
  
    export let result: ValuationResult;
  
    // Format number as currency
    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    };
  
    // Format number as percentage
    const formatPercent = (value: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }).format(value);
    };
  </script>
  
  <div class="bg-white shadow-lg rounded-lg p-6 mt-8">
    <h2 class="text-2xl font-bold mb-6">Valuation Results</h2>
  
    <!-- Initial Calculations -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">EBITDA</h3>
        <p class="text-2xl text-blue-600">{formatCurrency(result.ebitda)}</p>
      </div>
      <div class="p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Initial Free Cash Flow</h3>
        <p class="text-2xl text-blue-600">{formatCurrency(result.initialFcf)}</p>
      </div>
    </div>
  
    <!-- Yearly Calculations -->
    <div class="mb-8">
      <h3 class="text-xl font-semibold mb-4">Projected Cash Flows</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-4 py-2 text-left">Year</th>
              <th class="px-4 py-2 text-right">Free Cash Flow</th>
              <th class="px-4 py-2 text-right">Discounted FCF</th>
            </tr>
          </thead>
          <tbody>
            {#each result.yearlyCalculations as year}
              <tr class="border-t">
                <td class="px-4 py-2">Year {year.year}</td>
                <td class="px-4 py-2 text-right">{formatCurrency(year.fcf)}</td>
                <td class="px-4 py-2 text-right">{formatCurrency(year.discountedFcf)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  
    <!-- Terminal Value -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Terminal Value</h3>
        <p class="text-2xl text-blue-600">{formatCurrency(result.terminalValue)}</p>
      </div>
      <div class="p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Discounted Terminal Value</h3>
        <p class="text-2xl text-blue-600">{formatCurrency(result.discountedTerminalValue)}</p>
      </div>
    </div>
  
    <!-- Final Valuation -->
    <div class="bg-blue-50 p-6 rounded-lg">
      <h3 class="text-xl font-semibold mb-2">Final Business Valuation</h3>
      <p class="text-4xl text-blue-600 font-bold">{formatCurrency(result.totalValuation)}</p>
    </div>
  </div>