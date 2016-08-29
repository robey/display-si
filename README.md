# display-si

Handy functions for rounding numbers to human-friendly representations for display.

## Example

The best examples are in the unit tests under `test/`.

```javascript
roundToPrecision(123, 1)  // 100
roundToPrecision(123, 2)  // 120
roundToCurrency(31)       // 20
roundToCurrency(44)       // 50
toSI(1540)                // "1.5K"
toSI(74449000)            // "74M"
toBinarySI(1025)          // "1K"
toBinarySI(3145728)       // "3M"
```

## API

Precision methods will floor, ceiling, or round to the nearest decimal (base 10) number that preserves a desired number of digits. Currency methods do the same, but move to the nearest "currency" number instead of base 10. (The currency sequence is 1, 2, 5, 10, 20, 50, ...)

SI conversions turn unwieldy large or small numbers into SI-prefixed short numbers (0.1 becomes "100m") between `10**-18` and `10**18` (or `2**-60` and `2**60` in binary).

(FIXME: per-function doc)

- `roundToPrecision(n: number, digits: number): number`
- `ceilToPrecision(n: number, digits: number): number`
- `floorToPrecision(n: number, digits: number): number`

- `roundToCurrency(n: number): number`
- `ceilToCurrency(n: number): number`
- `floorToCurrency(n: number): number`

- `toSI(n: number, base: number = 1000.0): string`
- `toBinarySI(n: number): string`

## License

This module is released under the Apache 2.0 license.

## Authors

- Robey Pointer <robeypointer@gmail.com>
