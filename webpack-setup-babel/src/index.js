// .babelrc에서 "useBuiltIns": "usage" 으로 대체 가능하다.
import 'core-js/modules/es.object.values';
import 'core-js/modules/es.promise';

const elvenShieldRecipe = {
  leatherStrips: 2,
  ironIngot: 1,
  refinedMoonstone: 4,
};

// ES7 Object spread example
const elvenGauntletsRecipe = {
  ...elvenShieldRecipe,
  leather: 1,
  refinedMoonstone: 1,
};
console.log('ES7 Object spread example: ', elvenGauntletsRecipe);

// ES8 Object.values example
// NOTE: 새로운 메소드이기 때문에 babel/imported polyfills 없이는 변환될 수 없다.
console.log('ES8 Object.values example', Object.values(elvenGauntletsRecipe));
