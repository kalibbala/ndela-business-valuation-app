<!-- FinancialForm.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { ValuationService } from './../services/ValuationService';
  import ValuationResults from './ValuationResults.svelte';

  // Form state with typed interface
  interface FormData {
    revenue: string;
    operatingExpenses: string;
    ebitda: string;
    netIncome: string;
    growthRate: string;
    discountRate: string;
    taxRate: string;
    workingCapital: string;
    capex: string;
  }

  let formData: FormData = {
    revenue: '',
    operatingExpenses: '',
    ebitda: '',
    netIncome: '',
    growthRate: '',
    discountRate: '',
    taxRate: '',
    workingCapital: '',
    capex: ''
  }

  let errors: Partial<Record<keyof FormData, string>> = {}
  let touched: Partial<Record<keyof FormData, boolean>> = {}
  let valuationResult: any = null;
  const valuationService = new ValuationService();

  // Validation functions
  function validateNumber(value: string, fieldName: string): string | null {
    if (!value) return `${fieldName} is required`
    if (isNaN(Number(value))) return `${fieldName} must be a valid number`
    if (Number(value) < 0) return `${fieldName} cannot be negative`
    return null
  }

  function validatePercentage(value: string, fieldName: string): string | null {
    if (!value) return `${fieldName} is required`
    const num = Number(value)
    if (isNaN(num)) return `${fieldName} must be a valid percentage`
    if (num < 0 || num > 100) return `${fieldName} must be between 0 and 100`
    return null
  }

  function validateField(name: keyof FormData, value: string) {
    touched[name] = true

    if (['growthRate', 'discountRate', 'taxRate'].includes(name)) {
      errors[name] = validatePercentage(value, name)
    } else {
      errors[name] = validateNumber(value, name)
    }
  }

  // Handle input changes
  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement
    const name = target.name as keyof FormData
    const value = target.value

    formData[name] = value
    validateField(name, value)
  }

  function handleSubmit(e: Event) {
    e.preventDefault()
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key as keyof FormData, formData[key as keyof FormData])
    })

    // Check if form is valid
    const hasErrors = Object.values(errors).some(error => error !== null)
    
    if (!hasErrors) {
      // Convert string values to numbers
      const input = {
        revenue: Number(formData.revenue),
        operatingExpenses: Number(formData.operatingExpenses),
        ebitda: Number(formData.ebitda),
        netIncome: Number(formData.netIncome),
        growthRate: Number(formData.growthRate) / 100, // Convert percentage to decimal
        discountRate: Number(formData.discountRate) / 100,
        taxRate: Number(formData.taxRate) / 100,
        workingCapital: Number(formData.workingCapital),
        capex: Number(formData.capex)
      };

      // Calculate valuation
      valuationResult = valuationService.calculateValuation(input);
    }
  }

  // Initialize validation on mount
  onMount(() => {
    Object.keys(formData).forEach(key => {
      validateField(key as keyof FormData, formData[key as keyof FormData])
    })
  })

  $: isValid = Object.values(errors).every(error => error === null) &&
               Object.values(touched).every(field => field === true)
</script>

<div class="container mx-auto px-4 py-8">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Form Section -->
    <div class="form-container">
      <form on:submit={handleSubmit}>
        <h2 class="text-2xl font-bold mb-6">Business Valuation</h2>
        
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="revenue">Revenue</label>
            <input 
              type="number"
              id="revenue"
              name="revenue"
              class="form-input"
              value={formData.revenue}
              on:input={handleInput}
            />
            <span class="form-hint">Total sales and income of the business</span>
            {#if touched.revenue && errors.revenue}
              <span class="form-error">{errors.revenue}</span>
            {/if}
          </div>

          <div class="form-group">
            <label class="form-label" for="operatingExpenses">Operating Expenses</label>
            <input 
              type="number"
              id="operatingExpenses"
              name="operatingExpenses"
              class="form-input"
              value={formData.operatingExpenses}
              on:input={handleInput}
            />
            <span class="form-hint">Costs required to run the business</span>
            {#if touched.operatingExpenses && errors.operatingExpenses}
              <span class="form-error">{errors.operatingExpenses}</span>
            {/if}
          </div>

          <div class="form-group">
            <label class="form-label" for="ebitda">EBITDA</label>
            <input 
              type="number"
              id="ebitda"
              name="ebitda"
              class="form-input"
              value={formData.ebitda}
              on:input={handleInput}
            />
            <span class="form-hint">Earnings before interest, taxes, depreciation, and amortization</span>
            {#if touched.ebitda && errors.ebitda}
              <span class="form-error">{errors.ebitda}</span>
            {/if}
          </div>

          <div class="form-group">
            <label class="form-label" for="netIncome">Net Income</label>
            <input 
              type="number"
              id="netIncome"
              name="netIncome"
              class="form-input"
              value={formData.netIncome}
              on:input={handleInput}
            />
            <span class="form-hint">Profit after taxes and interest</span>
            {#if touched.netIncome && errors.netIncome}
              <span class="form-error">{errors.netIncome}</span>
            {/if}
          </div>

          <div class="form-group">
            <label class="form-label" for="growthRate">Growth Rate (%)</label>
            <input 
              type="number"
              id="growthRate"
              name="growthRate"
              class="form-input"
              value={formData.growthRate}
              on:input={handleInput}
              min="0"
              max="100"
              step="0.01"
            />
            <span class="form-hint">Expected annual growth in revenue or cash flow</span>
            {#if touched.growthRate && errors.growthRate}
              <span class="form-error">{errors.growthRate}</span>
            {/if}
          </div>

          <div class="form-group">
            <label class="form-label" for="discountRate">Discount Rate (WACC) (%)</label>
            <input 
              type="number"
              id="discountRate"
              name="discountRate"
              class="form-input"
              value={formData.discountRate}
              on:input={handleInput}
              min="0"
              max="100"
              step="0.01"
            />
            <span class="form-hint">Weighted average cost of capital</span>
            {#if touched.discountRate && errors.discountRate}
              <span class="form-error">{errors.discountRate}</span>
            {/if}
          </div>

          <div class="form-group">
            <label class="form-label" for="taxRate">Tax Rate (%)</label>
            <input 
              type="number"
              id="taxRate"
              name="taxRate"
              class="form-input"
              value={formData.taxRate}
              on:input={handleInput}
              min="0"
              max="100"
              step="0.01"
            />
            <span class="form-hint">Company's effective tax rate</span>
            {#if touched.taxRate && errors.taxRate}
              <span class="form-error">{errors.taxRate}</span>
            {/if}
          </div>

          <div class="form-group">
            <label class="form-label" for="workingCapital">Working Capital</label>
            <input 
              type="number"
              id="workingCapital"
              name="workingCapital"
              class="form-input"
              value={formData.workingCapital}
              on:input={handleInput}
            />
            <span class="form-hint">Difference between current assets and liabilities</span>
            {#if touched.workingCapital && errors.workingCapital}
              <span class="form-error">{errors.workingCapital}</span>
            {/if}
          </div>

          <div class="form-group">
            <label class="form-label" for="capex">Capital Expenditures (CapEx)</label>
            <input 
              type="number"
              id="capex"
              name="capex"
              class="form-input"
              value={formData.capex}
              on:input={handleInput}
            />
            <span class="form-hint">Annual spending on assets like equipment or property</span>
            {#if touched.capex && errors.capex}
              <span class="form-error">{errors.capex}</span>
            {/if}
          </div>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button type="submit" class="form-button" disabled={!isValid}>
            Calculate Valuation
          </button>
        </div>
      </form>
    </div>

    <!-- Results Section -->
    <div class="h-full">
      {#if valuationResult}
        <ValuationResults result={valuationResult} />
      {:else}
        <div class="flex h-full items-center justify-center bg-gray-50 rounded-lg p-8">
          <p class="text-gray-500 text-center">
            Fill out the form and click "Calculate Valuation" to see the business valuation results.
          </p>
        </div>
      {/if}
    </div>
  </div>
</div>