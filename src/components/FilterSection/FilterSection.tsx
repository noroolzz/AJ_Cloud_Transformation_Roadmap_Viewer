interface FilterSectionProps<T extends string> {
  title: string;
  options: T[];
  selectedOptions: T[];
  onToggle: (option: T) => void;
}

export function FilterSection<T extends string>({
  title,
  options,
  selectedOptions,
  onToggle,
}: FilterSectionProps<T>) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-slate-700">{title}</legend>
      <div className="flex flex-col gap-1.5">
        {options.map((option) => {
          const checked = selectedOptions.includes(option);
          return (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
