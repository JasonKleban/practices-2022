
# Practices 2021

Minimalist pnpm typescript webpack monorepo demonstrating possible efficiency differences between typescript `tsc --build` vs `webpack` with ts-loader

## Getting Started

If you don't already have PNPM installed > `npm install -g pnpm`

```
$ git clone https://github.com/JasonKleban/practices-2022.git
```

`pnpm i && pnpm prepare`

Clear the profiler (see below) and _either_ `pnpm build` _or_ `pnpm tsc`

Between profiling attempts, `pnpm purge && pnpm i && pnpm prepare` again.

There's nothing to run, we're focused on the build methods here.

## Notes

This project intentionally avoids typescript project references because without hacks, such successful compilations will refer to unresolvable modules at runtime. I don't think that has any bearing on the problem, but I'm anticipating such a suggestion.

## Profiling

Use Microsoft's Sysinternals' Process Monitor (procmon64.exe) available from https://docs.microsoft.com/en-us/sysinternals/downloads/procmon

Add to its default filters: `Process Name = node.exe` and `Operation = ReadFile`.

Isolate event captures from both `pnpm build` (webpack) vs `pnpm tsc` (tsc --build) and compare.  Use Tools >> File Summary to group by file path.

Notice an explosion in file reads of webpack & ts-loader over `tsc --build`. For this small codebase, tsc does 238 reads (165 unique) with only **two** reads (why not one?) of react's package.json in ~3.2 seconds. webpack does 1,227 reads (988 unique) with **eighteen** reads of react's package.json in ~6.5 seconds.

I'm sure that many of the extra unique reads and some of the extra time by webpack are necessarily for webpack's additional scripts - but based on my experience with the much larger project, I don't think that's the whole explanation.

## See also

* https://github.com/microsoft/TypeScript/issues/42670
* https://github.com/TypeStrong/ts-loader/issues/1245
* https://github.com/webpack/webpack/issues/12566