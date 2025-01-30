# Business Valuation Calculator

A web-based tool for calculating business valuations using the Discounted Cash Flow (DCF) method. This application provides a user-friendly interface for inputting financial data and generates detailed valuation analysis.

## 🚀 Live Demo

[View Live Demo](your-vercel-url-here)

## ✨ Features

* **Interactive Form Input**
  * Easy-to-use form with helpful hints
  * Real-time validation
  * Detailed field descriptions

* **Advanced Calculations**
  * EBITDA calculation
  * Free Cash Flow (FCF) projections
  * Terminal value estimation
  * Discounted cash flow analysis

* **Clear Results Display**
  * Year-by-year cash flow projections
  * Detailed terminal value calculations
  * Final business valuation summary

* **Responsive Design**
  * Desktop and mobile friendly
  * Side-by-side layout on larger screens
  * Stacked layout on mobile devices

## 🛠️ Tech Stack

* [Svelte 5](https://svelte.dev/) - Frontend framework
* [TypeScript](https://www.typescriptlang.org/) - Type safety
* [Tailwind CSS](https://tailwindcss.com/) - Styling
* [Vite](https://vitejs.dev/) - Build tool

## 🚦 Getting Started

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/business-valuation-app.git
   ```

2. Navigate to project directory
   ```bash
   cd business-valuation-app
   ```

3. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

4. Start development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open `http://localhost:5173` in your browser

### Production Build

```bash
npm run build
# or
yarn build
```

## 📊 Calculation Method

The DCF valuation follows these steps:

### 1. EBITDA Calculation
```
EBITDA = Revenue - Operating Expenses
```

### 2. Free Cash Flow (FCF)
```
FCF = EBITDA - Taxes - CapEx - Change in Working Capital
```

### 3. Growth Projections
* Projects cash flows for 5 years
* Uses specified growth rate
* Compounds annually

### 4. Terminal Value
```
Terminal Value = FCF × (1 + Growth Rate) / (Discount Rate - Growth Rate)
```

### 5. Final Valuation
* Sum of:
  * Discounted future cash flows
  * Discounted terminal value

## 🤝 Contributing

Pull requests are welcome! For major changes:

1. Fork the repo
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit changes
   ```bash
   git commit -m 'Add AmazingFeature'
   ```
4. Push to branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

* Built with [Svelte](https://svelte.dev/)
* Styled with [Tailwind CSS](https://tailwindcss.com/)
* Deployed on [Vercel](https://vercel.com/)

## 📧 Contact

Kalibbala Albert Apollo - [@kalibbala_ap](https://x.com/kalibbala_ap)
