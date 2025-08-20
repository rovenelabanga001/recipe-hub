// categoriesFilter.js
import {
  MdRoundEmojiFoodBeverage,
  MdSharpFastfood,
} from "@kalimahapps/vue-icons/md";
import { FlFood, FlFilledFoodCake } from "@kalimahapps/vue-icons/fl";
import { HeOutlineUnhealthyFood } from "@kalimahapps/vue-icons/he";
import { PhBowlFood } from "@kalimahapps/vue-icons/ph";
import { CoDrinkAlcohol } from "@kalimahapps/vue-icons/co";
import { CaCollapseAll } from "@kalimahapps/vue-icons";

export const categoriesFilter = [
  {
    icon: CaCollapseAll,
    name: "All",
  },
  {
    icon: MdRoundEmojiFoodBeverage,
    name: "Breakfast",
  },
  {
    icon: MdSharpFastfood,
    name: "Brunch",
  },
  {
    icon: FlFood,
    name: "Lunch",
  },
  {
    icon: HeOutlineUnhealthyFood,
    name: "Dinner",
  },
  {
    icon: PhBowlFood,
    name: "Desserts",
  },
  {
    icon: FlFilledFoodCake,
    name: "Snacks",
  },
  {
    icon: CoDrinkAlcohol,
    name: "Drinks",
  },
];
