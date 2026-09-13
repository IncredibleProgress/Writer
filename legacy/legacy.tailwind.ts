/* 
Tailwind CSS style classes constructor

class Style is an utility provided by the Sweetheart project
https://github.com/IncredibleProgress/Sweetheart
*/

export type TwClasses = Record<string, string>;
type TwVariant = { preset?: TwClasses; chain?: string; omit?: string };
export class Style {

  // Preset style definitions for the project
  public presetValues: Record<string, TwClasses> = {};

  // Variant style definitions for the project
  public variantValues: Record<string, TwVariant> = {};

  // Functions to generate class strings for presets and variants
  preset: Record<string, () => string> = {};
  variant: Record<string, () => string> = {};

  // Generate the final class string based on the provided variant
  className({ ...variant }: TwVariant): string {
    const classSet = new Set<string>();
    if (variant.preset) {
      Object.values(variant.preset).forEach((classGroup) => {
        classGroup.split(/\s+/).forEach((cls) => {
          if (cls.length > 0) classSet.add(cls);
        });
      });
    }
    if (variant.chain) {
      variant.chain.split(/\s+/).forEach((cls) => {
        if (cls.length > 0) classSet.add(cls);
      });
    }
    if (variant.omit) {
      variant.omit.split(/\s+/).forEach((omitClass) => {
        if (omitClass.length > 0) classSet.delete(omitClass);
      });
    }
    return Array.from(classSet).join(" ");
  }

  // Initialize preset and variant functions based on the defined values
  constructor() {
    Object.entries(this.presetValues).forEach(([key, value]) => {
      this.preset[key as keyof typeof this.presetValues] = () => this.className({ preset: value }) + " ";
    });
    Object.entries(this.variantValues).forEach(([key, value]) => {
      this.variant[key as keyof typeof this.variantValues] = () => this.className(value) + " ";
    });
  }
}
