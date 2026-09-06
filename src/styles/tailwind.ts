/* 
Tailwind CSS style classes constructor

class Style is an utility provided by the Sweetheart project
https://github.com/IncredibleProgress/Sweetheart
*/

export type TwClasses = Record<string, string>;
type TwVariant = { preset?: TwClasses; chain?: string; omit?: string };
export class Style {

  // Preset style definitions for the project
  public presetValues: Record<string, TwClasses> = {
    main: {
      color: "bg-stone-100",
      layout: "p-8 max-w-3xl min-h-screen rounded-lg",
    },
    title: {
      font: "text-center text-3xl font-light",
      color: "text-stone-950",
      space: "mb-10",
    },
    articleCard: {
      color: "border-b border-stone-300",
      space: "mb-10",
    },
    articleTitle: {
      font: "text-xs font-semibold uppercase tracking-[0.18em]",
      color: "text-stone-600",
      space: "mb-6",
    },
    articleContent: {
      font: "text-[1.1rem] leading-[1.8] tracking-[0.02em]",
      space: "mb-6 [&_p]:mb-3 [&_p]:indent-1",
    },
  };

  // Variant style definitions for the project
  public variantValues: Record<string, TwVariant> = {
    
  };

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
