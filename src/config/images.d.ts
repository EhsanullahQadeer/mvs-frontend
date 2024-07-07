/*************************************************************************
 * @file images.d.ts
 * @author End Quote
 * @desc Module declarations for handling svg and png imports.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}
