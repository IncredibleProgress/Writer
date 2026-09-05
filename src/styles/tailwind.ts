export type TwClasses = Record<string, string>;
type TwVariant = { preset?: TwClasses; chain?: string; omit?: string };

export class Style {
  public presetValues: Record<string, TwClasses> = {
    body: {
      font: "font-serif",
      color: "text-[#586e75] bg-[#fdf6e3]",
      layout: "mx-auto min-h-screen max-w-3xl",
    },
    title: {
      font: "text-center text-2xl font-bold tracking-tight leading-tight",
      color: "text-[#073642]",
      space: "my-6",
    },
    articleCard: {
      layout: "w-full",
      space: "mb-6 px-4",
    },
    articleTitle: {
      font: "text-sm font-semibold uppercase tracking-[0.2em]",
      color: "text-[#657b83]",
      space: "my-4",
    },
    articleContent: {
      h1: "[&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-[#073642]",
      h2: "[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[#073642]",
      h3: "[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-[#073642]",
      text: "[&_p]:mb-3 [&_p]:text-[1.03rem] [&_p]:leading-7 [&_a]:text-[#268bd2] [&_a]:no-underline [&_strong]:text-[#073642]",
      lists: "[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6",
    },
  };

  public variantValues: Record<string, TwVariant> = {
    articleCardInteractive: {
      preset: this.presetValues.articleCard,
      chain: "cursor-pointer",
    },
  };

  preset: Record<string, () => string> = {};
  variant: Record<string, () => string> = {};

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

  constructor() {
    Object.entries(this.presetValues).forEach(([key, value]) => {
      this.preset[key as keyof typeof this.presetValues] = () => this.className({ preset: value }) + " ";
    });

    Object.entries(this.variantValues).forEach(([key, value]) => {
      this.variant[key as keyof typeof this.variantValues] = () => this.className(value) + " ";
    });
  }
}
