import { skills } from "@/data/skills";

export function Skills() {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2">
      {skills.map((group) => (
        <fieldset key={group.category} className="group-box px-3 pt-1 pb-3">
          <legend className="px-1 text-[11px] font-bold">
            {group.category}
          </legend>
          <ul className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="border border-[var(--color-chrome-dark)] bg-[var(--color-chrome)] px-1.5 py-0.5 font-mono text-[11px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
