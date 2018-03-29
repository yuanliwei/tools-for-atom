# flex 布局
[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
## box
- `display: flex;`
- `display: inline-flex;`

## 容器属性
- `flex-direction: row | row-reverse | column | column-reverse;`
- `flex-wrap: nowrap | wrap | wrap-reverse;`
- `flex-flow: <flex-direction> || <flex-wrap>`
- `justify-content: flex-start | flex-end | center | space-between | space-around;`
- `align-items: flex-start | flex-end | center | baseline | stretch;`
- `align-content: flex-start | flex-end | center | space-between | space-around | stretch;`

## 项目属性
- `order: <integer>;`
- `flex-grow: <number>; /* default 0 */`
- `flex-shrink: <number>; /* default 1 */`
- `flex-basis: <length> | auto; /* default auto */`
- `flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`
- `align-self: auto | flex-start | flex-end | center | baseline | stretch;`
