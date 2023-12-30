/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    ...[...Array(7)].flatMap((_, i) => [
      `basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `sm:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `md:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `lg:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `xl:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
      `2xl:basis-[calc((100%-(${i + 1}*0.5rem))/${i + 2})]`,
    ]),
  ],
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-safe-area')],
}
