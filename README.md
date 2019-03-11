<p align="center">
  <img width="650" src="docs/assets/logo.png">
  <br />
  Data visualization library for React based on D3js
  <br /><br />
  
  <a href="https://circleci.com/gh/jask-oss/reaviz">
    <img src="https://circleci.com/gh/jask-oss/reaviz.svg?style=svg" />
  </a>
  <a href="https://npm.im/reaviz">
    <img src="https://img.shields.io/npm/v/reaviz.svg" />
  </a>
  <a href="https://github.com/jask-oss/reaviz/blob/master/LICENSE">
    <img src="https://badgen.now.sh/badge/license/apache2" />
  </a>
</p>

---

REAVIZ is a modular chart component library that leverages
React natively for rendering the components while using D3js under the
hood for calculations. The library provides an easy way to get started
creating charts without sacrificing customization ability.

## 🚀 Quick Links

- Checkout the [demos](https://jask-oss.github.io/reaviz/)
- Learn more in the [docs](/docs)
- Try it yourself on [CodeSandbox](https://codesandbox.io/embed/m7rl2z1989)
- Learn about updates from the [changelog](CHANGELOG.md)

## ✨ Features

Chart types include:

- Bar Chart
- Line Chart
- Area Chart
- Pie Chart
- Bubble Chart
- Scatter Plot
- Hive Plot
- Sankey Chart
- Map Chart
- Sparklines

Additional features:

- Legend
- Tooltips
- Animations Enter/Update/Exit
- Advanced Axis Configuration
- Brush
- Panning / Zooming
- Gestures
- Grid/Mark Lines
- BigInt Support

## 📦 Install

To use reaviz in your project, install it via npm/yarn:

```
npm i reaviz --save
```

then import a chart type into your JSX element:

```jsx
import { BarChart } from "reaviz";

const data = [
  { key: 'IDS', data: 14 },
  { key: 'Malware', data: 5 },
  { key: 'DLP', data: 18 }
];

const App = () => <BarChart width={350} height={250} data={data} />;
```

Checkout this [demo live](https://codesandbox.io/embed/m7rl2z1989) or
visit the [demos page](https://jask-oss.github.io/reaviz/) to learn more!

## 🔭 Development

If you want to run REAVIZ locally, its super easy!

- Clone the repository
- `npm i`
- `npm start`
- Browser opens to Storybook page
