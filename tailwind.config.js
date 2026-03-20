/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  safelist: [
    "text-violet-500","bg-violet-500","bg-violet-600","bg-violet-500/10","ring-violet-400/60",
    "text-blue-500","bg-blue-500","bg-blue-600","bg-blue-500/10","ring-blue-400/60",
    "text-emerald-500","bg-emerald-500","bg-emerald-600","bg-emerald-500/10","ring-emerald-400/60",
    "text-rose-500","bg-rose-500","bg-rose-600","bg-rose-500/10","ring-rose-400/60",
    "text-amber-500","bg-amber-500","bg-amber-600","bg-amber-500/10","ring-amber-400/60",
    "text-teal-500","bg-teal-500","bg-teal-600","bg-teal-500/10","ring-teal-400/60",
  ],
  darkMode: "class",
}
