// global.d.ts
export {};

declare global {
  interface Window {
    actblueConfig?: any; // You can specify a more specific type if you know it
  }
}
