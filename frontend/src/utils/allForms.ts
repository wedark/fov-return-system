// const formsContext = require.context('../../files', false, /\.(json)$/);
// const formsContext = require.context('../../files', false, /\.json$/);

const activeFormsContext = require.context('../../files/active', false, /\.json$/);
const completedFormsContext = require.context('../../files/completed', false, /\.json$/);

export const formsJsonFiles = {
  active: preventRequireContextKeyDuplication(activeFormsContext.keys()).map((key) => ({
    imported: activeFormsContext(key),
    filename: key,
  })),
  completed: preventRequireContextKeyDuplication(completedFormsContext.keys()).map((key) => ({
    imported: completedFormsContext(key),
    filename: key,
  })),
};
// export const formsJsonFiles = preventRequireContextKeyDuplication(formsContext.keys()).map(
//   (key) => ({
//     imported: formsContext(key),
//     filename: key,
//   }),
// );

/** I don't know why, but otherwise there is 2 copies of each image — one with relative path, and the other with absolute path from project root */
function preventRequireContextKeyDuplication(keys: string[]) {
  // console.log('keys', keys);
  return keys.slice(0, keys.length / 2);
}
