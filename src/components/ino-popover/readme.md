# ino-popover
A Popover is a dialog which is bound to a specific element and appears on top of the current page. It is based on [tooltip.js](https://github.com/FezVrasta/popper.js#tooltipjs) to position the popover.

The Popover and [Tooltip](../ino-tooltip) components are very similar. However, whereas tooltips can only display plain text, popovers are complex dialogs with many HTML elements.

### Usage
The component can be used as follows:

```html
<ino-popover
  ino-for="<string>"
  ino-placement="<string"
  ino-trigger="<string>">

  Any desired HTML 

</ino-popover>
```


<!-- Auto Generated Below -->


## Properties

#### inoFor

string

The target id the tooltip belongs to.
If not given, the tooltip is attached to the parent component.


#### inoPlacement

string

The placement of this popover.
Accepted values: `top(-start, -end)`, `right(-start, -end)`,
`bottom(-start, -end)`, `left(-start, -end)`


#### inoTrigger

string

The trigger to show the tooltip - either click, hover or focus.
Multiple triggers are possible by separating them with a space.


## Attributes

#### ino-for

string

The target id the tooltip belongs to.
If not given, the tooltip is attached to the parent component.


#### ino-placement

string

The placement of this popover.
Accepted values: `top(-start, -end)`, `right(-start, -end)`,
`bottom(-start, -end)`, `left(-start, -end)`


#### ino-trigger

string

The trigger to show the tooltip - either click, hover or focus.
Multiple triggers are possible by separating them with a space.



----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*