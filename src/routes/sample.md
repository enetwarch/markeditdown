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

# MarkEditDown Extended Test Suite

---

## 5. Task Lists (Sync Test)

- [x] Research Svelte 5 runes
- [ ] Implement local-first storage
- [ ] Finish the "Web-to-Steam" board game pipeline
- [ ] Test two-way checkbox sync (Try clicking me in the preview!)

## 6. Tables (Layout & Gap Test)

| Framework | Language   | Role     | Status      |
| :-------- | :--------- | :------- | :---------- |
| Svelte 5  | TypeScript | Frontend | In Progress |
| Go        | Golang     | Backend  | Active      |
| SQLite    | SQL        | Database | Local-First |

## 7. Nested Blockquotes & Complex Formatting

> "The best way to predict the future is to invent it."
>
> > This is a nested quote to test your `border-left` and `padding` stacking.
> >
> > - It even contains a **list** inside it.

## 8. Code Blocks with Different Languages

```typescript
// Testing TypeScript highlighting
interface Project {
  name: string;
  isOpenSource: boolean;
}

const markEditDown: Project = {
  name: "MarkEditDown",
  isOpenSource: true,
};
```
