export interface Framework {
  name: string;
  value: string;
  image: string;
}

export const frameworks = [
  { name: "Next.js", value: "nextjs", image: "/nextjs.png" },
  { name: "React.js", value: "reactjs", image: "/reactjs.webp" },
  { name: "Vue.js", value: "vuejs", image: "/vue.png" },
  { name: "Angular", value: "angular", image: "/angular.png" },
  { name: "Svelte", value: "svelte", image: "/svelte.png" },
  { name: "Gatsby", value: "gatsby", image: "/gatsby.png" },
  { name: "Nuxt.js", value: "nuxtjs", image: "/nuxt.png" },
  { name: "Ember.js", value: "emberjs", image: "/emberjs.png" },
  { name: "Laravel", value: "laravel", image: "/laravel.png" },
  { name: "Django", value: "django", image: "/django.png" },
  {
    name: "Spring Boot",
    value: "springboot",
    image: "/springboot.png",
  },
  { name: "Ruby on Rails", value: "rails", image: "/ruby.png" },
  {
    name: "Express.js",
    value: "expressjs",
    image: "/expressjs.png",
  },
];

export function getFrameworkByValue(value: string): Framework | undefined {
  return frameworks.find((fw) => fw.value === value);
}
