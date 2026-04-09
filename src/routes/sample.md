# MarkEditDown Test Suite

---

## 1. Typography & Emphasis

This is a standard paragraph to test your `--color-foreground` and `Source Code Pro` font.

- **This is bold text** (Primary Color + Bold)
- _This is italic text_ (Italic)
- ~~This is a strikethrough~~ (Line-through)
- `This is inline code` (Monospace + Primary)

## 2. Lists & Structure

- List Item One
- List Item Two
  1. Nested Numbered List
  2. Primary color should show on bullets/numbers

> This is a blockquote. It should be italicized and using your sub-foreground color.
> It's great for keeping "low-profile" notes.

## 3. Links & Images

[Visit Holy Angel University](https://www.hau.edu.ph)
![Alt text for image](https://via.placeholder.com/150)

## 4. Code Blocks

```go
package main

import "fmt"

// This is a comment - should be italic and gray
func main() {
    keywords := []string{"Go", "Svelte", "TypeScript"}
    for _, lang := range keywords {
        fmt.Printf("Developing MarkEditDown with %s\n", lang)
    }
}
```
