import { ZodType } from 'zod';

/** @see https://github.com/colinhacks/zod/issues/273#issuecomment-1434077058 */

declare module 'zod' {
  interface ZodType {
    metadata(): Record<string, any>;
    associateMetadata(meta: Record<string, any>): this;
  }
}

ZodType.prototype.metadata = function () {
  return this._def.meta;
};

ZodType.prototype.associateMetadata = function (meta: Record<string, any>) {
  const This = (this as any).constructor;
  return new This({
    ...this._def,
    meta,
  });
};

// const obj = z.object({}).associateMetadata({ label: 'hello' });
// console.log(obj.metadata().label);

// const User = z.object({
//   name: z.string(),
//   birthYear: z.number(),
//   isLeftHanded: z.boolean().associateMetadata({ label: 'is he left handed?' }),
//   nestedShit: z.object({
//     iAmInside: z.string().associateMetadata({ cumming: true }),
//     someStr: z.string(),
//   }),
// });

// console.log(User.shape.nestedShit.shape);
// // // @ts-expect-error
// // User.shape.isLeftHanded.meta = 'kek';

// // abstract class ZodTypeWithMetadata extends ZodType {
// //   // associateMetadata()

// }
