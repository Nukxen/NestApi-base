import { AutoErrorReturn } from '../error-lib/error-lib';

export async function tryCatch<T>(
  fn: () => Promise<T>,
  params?: any,
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (err) {
    //if (params) console.log("params:",params);
    AutoErrorReturn(err);
  }
}
