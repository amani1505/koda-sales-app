type VariantProps<T extends Record<string, Record<string, string>>> = {
    [K in keyof T]?: keyof T[K];
  };
  
  export function createVariants<T extends Record<string, Record<string, string>>>(
    base: string,
    variants: T
  ) {
    return (props: VariantProps<T>) => {
      const variantClasses = Object.entries(props).map(([key, value]) => {
        if (value && variants[key] && variants[key][value]) {
          return variants[key][value];
        }
        return "";
      });
  
      return [base, ...variantClasses].join(" ");
    };
  }