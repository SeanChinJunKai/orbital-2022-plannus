import * as tinycolor from 'tinycolor2';

export const pageColors = [
    {
        name: '--color-primary',
        bright: '#232d75',
        dark: tinycolor('#000000').lighten(22),
    },
    {
        name:  '--color-secondary',
        bright: '#3e4796',
        dark: tinycolor('#000000').lighten(17),
    },
    {
        name: '--color-tertiary',
        bright: '#f8f7ff',
        dark: tinycolor('#000000').lighten(30),
    },
    {
        name: '--color-input-primary',
        bright: '#f0f0f0',
        dark: tinycolor('#000000').lighten(50)
    },
    {
        name: '--color-input-secondary',
        bright: '#ffffff',
        dark: tinycolor('#000000').lighten(45)
    },
    {
        name: '--color-input-tertiary',
        bright: '#cccccc',
        dark: tinycolor('#000000').lighten(35)
    },
    {
        name: '--color-background',
        bright: '#d5d9eb',
        dark: tinycolor('#000000').lighten(38),
    },    
    {
        name: '--color-text-primary',
        bright: '#3d3737',
        dark: tinycolor('#3d3737').lighten(60),
    },
    {
        name: '--color-text-secondary',
        bright: '#232d75',
        dark: '#bb86fc',
    },
    {
        name: '--color-text-tertiary',
        bright: '#E2E2E2',
        dark: tinycolor('#E2E2E2').lighten(80),
    },
    {
        name: '--color-border-primary',
        bright: '#000000',
        dark: tinycolor('#000000').lighten(70),
    },
    {
        name: '--color-border-secondary',
        bright: '#d5d9eb',
        dark: tinycolor('#000000').lighten(50)
    },
    {
        name: '--color-remove',
        bright: '#d61c1c',
        dark: tinycolor('#d61c1c').darken(15)
    },
  ];

  export default pageColors;