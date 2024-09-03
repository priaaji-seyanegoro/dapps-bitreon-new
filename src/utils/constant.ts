export interface Framework {
  name: string;
  value: string;
  image: string;
}

export const frameworks = [
  { name: "Next.js", value: "nextjs", image: "/nextjs.png", isDisable: false },
  { name: "React.js", value: "reactjs", image: "/reactjs.webp", isDisable: false },
  { name: "Vue.js", value: "vuejs", image: "/vue.png", isDisable: false },
  { name: "Gatsby", value: "gatsby", image: "/gatsby.png", isDisable: false },
  { name: "Nuxt.js", value: "nuxtjs", image: "/nuxt.png", isDisable: false },
  { name: "Ember.js", value: "emberjs", image: "/emberjs.png", isDisable: false },
  { name: "Angular", value: "angular", image: "/angular.png", isDisable: true },
  { name: "Svelte", value: "svelte", image: "/svelte.png", isDisable: true },
  { name: "Laravel", value: "laravel", image: "/laravel.png", isDisable: true },
  { name: "Django", value: "django", image: "/django.png", isDisable: true },
  {
    name: "Spring Boot",
    value: "springboot",
    image: "/springboot.png",
    isDisable: true
  },
  { name: "Ruby on Rails", value: "rails", image: "/ruby.png", isDisable: true },
  {
    name: "Express.js",
    value: "expressjs",
    image: "/expressjs.png",
    isDisable: true
  },
];

export function getFrameworkByValue(value: string): Framework | undefined {
  return frameworks.find((fw) => fw.value === value);
}
