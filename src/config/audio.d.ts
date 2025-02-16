/*************************************************************************
 * @file images.d.ts
 * @author Ehsanullah Qadeer
 * @desc Module declarations for handling mp3 imports.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module '*.wav' {
  const src: string;
  export default src;
}