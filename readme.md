
# Practices 2022

Minimalist pnpm typescript webpack monorepo demonstrating possible efficiency differences between typescript `tsc --build` vs `webpack` with ts-loader

## Getting Started

If you don't already have PNPM installed > `npm install -g pnpm`

```
$ git clone https://github.com/JasonKleban/practices-2022.git
```

`pnpm i && pnpm build-deps`

Clear the profiler (see below) and _either_ `pnpm build` _or_ `pnpm tsc`

Between profiling attempts, `pnpm purge && pnpm i && pnpm build-deps` again.

There's nothing to run, we're focused on the build methods here.

## Notes

This project intentionally avoids typescript project references because without hacks, such successful compilations will refer to unresolvable modules at runtime. I don't think that has any bearing on the problem, but I'm anticipating such a suggestion.

## Profiling

Use Microsoft's Sysinternals' Process Monitor (procmon64.exe) available from https://docs.microsoft.com/en-us/sysinternals/downloads/procmon

Add to its default filters: `Process Name = node.exe` and `Operation = ReadFile`.

Isolate event captures from both `pnpm build` (webpack) vs `pnpm tsc` (tsc --build) and compare.  Use Tools >> File Summary to group by file path.

## See also

* https://github.com/microsoft/TypeScript/issues/42670
* https://github.com/TypeStrong/ts-loader/issues/1245
* https://github.com/webpack/webpack/issues/12566