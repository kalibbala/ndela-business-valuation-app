// ValuationService.ts

interface ValuationInput {
    revenue: number;
    operatingExpenses: number;
    ebitda: number;
    netIncome: number;
    growthRate: number;
    discountRate: number;
    taxRate: number;
    workingCapital: number;
    capex: number;
  }
  
  interface YearlyCalculation {
    year: number;
    fcf: number;
    discountedFcf: number;
  }
  
  interface ValuationResult {
    ebitda: number;
    initialFcf: number;
    yearlyCalculations: YearlyCalculation[];
    terminalValue: number;
    discountedTerminalValue: number;
    totalValuation: number;
  }
  
  export class ValuationService {
    private readonly PROJECTION_YEARS = 5;
  
    calculateValuation(input: ValuationInput): ValuationResult {
      // Step 1: Calculate EBITDA
      const ebitda = this.calculateEBITDA(input);
  
      // Step 2: Calculate initial Free Cash Flow
      const initialFcf = this.calculateInitialFCF(input, ebitda);
  
      // Step 3 & 4: Project and discount FCF for future years
      const yearlyCalculations = this.calculateYearlyFCF(initialFcf, input.growthRate, input.discountRate);
  
      // Step 5: Calculate terminal value
      const terminalValue = this.calculateTerminalValue(
        yearlyCalculations[this.PROJECTION_YEARS - 1].fcf,
        input.growthRate,
        input.discountRate
      );
  
      const discountedTerminalValue = this.discountTerminalValue(
        terminalValue,
        input.discountRate,
        this.PROJECTION_YEARS
      );
  
      // Step 6: Calculate total valuation
      const totalValuation = this.calculateTotalValuation(yearlyCalculations, discountedTerminalValue);
  
      return {
        ebitda,
        initialFcf,
        yearlyCalculations,
        terminalValue,
        discountedTerminalValue,
        totalValuation
      };
    }
  
    private calculateEBITDA(input: ValuationInput): number {
      return input.revenue - input.operatingExpenses;
    }
  
    private calculateInitialFCF(input: ValuationInput, ebitda: number): number {
      const taxes = ebitda * input.taxRate;
      return ebitda - taxes - input.capex - input.workingCapital;
    }
  
    private calculateYearlyFCF(
      initialFcf: number,
      growthRate: number,
      discountRate: number
    ): YearlyCalculation[] {
      const calculations: YearlyCalculation[] = [];
      let currentFcf = initialFcf;
  
      for (let year = 1; year <= this.PROJECTION_YEARS; year++) {
        currentFcf = year === 1 ? currentFcf : currentFcf * (1 + growthRate);
        const discountedFcf = currentFcf / Math.pow(1 + discountRate, year);
  
        calculations.push({
          year,
          fcf: currentFcf,
          discountedFcf
        });
      }
  
      return calculations;
    }
  
    private calculateTerminalValue(
      finalYearFcf: number,
      growthRate: number,
      discountRate: number
    ): number {
      return (finalYearFcf * (1 + growthRate)) / (discountRate - growthRate);
    }
  
    private discountTerminalValue(
      terminalValue: number,
      discountRate: number,
      years: number
    ): number {
      return terminalValue / Math.pow(1 + discountRate, years);
    }
  
    private calculateTotalValuation(
      yearlyCalculations: YearlyCalculation[],
      discountedTerminalValue: number
    ): number {
      const sumDiscountedFcf = yearlyCalculations.reduce(
        (sum, calc) => sum + calc.discountedFcf,
        0
      );
      return sumDiscountedFcf + discountedTerminalValue;
    }
  }